import { copy, getCompItem, paste } from "../utils/app";
import { getAllNautilusEffect } from "../utils/effect";
import { handleIssue } from "../utils/error";
import {
  findAbsoluteKeyframe,
  getSelectedLayer,
  isCompLayer,
  isTextLayer,
  unSelectAllLayer,
} from "../utils/layer";
import { createProgress } from "../utils/progress";
import { findAnimatorIndexesByEffectName } from "../utils/textLayer";
import { extractChar } from "./extract";
import { applyLayers, applyTextLayer } from "../utils/nautilusExpr";

const bakeFromPrecomp = (compLayer: AVLayer) => {
  try {
    const matchNames = [
      "ADBE Position",
      "ADBE Scale",
      "ADBE Rotate Z",
      "ADBE Opacity",
    ];

    const innerComp = compLayer.source;
    const startTime = innerComp.workAreaStart;
    const endTime = innerComp.workAreaDuration + startTime;
    const progress = createProgress(
      "Nautilus Bake",
      "Baking expression into keyframes...",
      { minValue: startTime, maxValue: endTime },
    );

    for (let i = 1; i <= innerComp.numLayers; i++) {
      const layer = innerComp.layer(i);
      const transformGrp = layer.property("ADBE Transform Group");

      matchNames.forEach((matchName) => {
        const prop = transformGrp.property(matchName);
        if (prop.canSetExpression && prop.expressionEnabled) {
          let prevValue = null;

          const cache = [];
          for (let t = startTime; t <= endTime; t += innerComp.frameDuration) {
            const currentValue = prop.valueAtTime(t, false);

            if (
              prevValue === null ||
              currentValue.toString() !== prevValue.toString()
            ) {
              cache.push({ time: t, value: currentValue });
            }

            prevValue = currentValue;
            progress.setProgress(t);
          }
          cache.forEach((item) => {
            const newKeyIndex = prop.addKey(item.time);
            prop.setInterpolationTypeAtKey(
              newKeyIndex,
              KeyframeInterpolationType.LINEAR,
              KeyframeInterpolationType.HOLD,
            );
            prop.setValueAtKey(newKeyIndex, item.value);
          });

          prop.expressionEnabled = false;
        }
      });
    }

    progress.close();
  } catch (e) {
    handleIssue({
      level: "WARNING",
      message:
        "The Bake function for Composition encountered an error: " + String(e),
    });
  }
};

function bakeFromText(layer: AVLayer) {
  try {
    const ntlsFX = getAllNautilusEffect(layer);
    if (ntlsFX.length <= 0)
      throw new Error(
        "This Bake function only works for nautilus applied text layer.",
      );

    ntlsFX.forEach((effect) => (effect.selected = true));

    copy();

    const comp = getCompItem();
    const currentTime = comp.time;
    comp.time = comp.duration;

    const animatorsGroup = layer
      .property("ADBE Text Properties")
      .property("ADBE Text Animators");
    const nautilusEffects = getAllNautilusEffect(layer);

    nautilusEffects.forEach((effect) => {
      const animatorIndexes = findAnimatorIndexesByEffectName(
        layer,
        effect.name,
      );
      if (animatorIndexes)
        animatorIndexes.forEach((index) =>
          animatorsGroup.property(index).remove(),
        );
    });

    const preComp = extractChar(layer);

    const compLayer = comp.layer(preComp.name) as AVLayer;

    unSelectAllLayer();
    compLayer.selected = true;
    const absoluteKeyframes = findAbsoluteKeyframe(layer);

    comp.time = absoluteKeyframes.minTime;
    paste();

    applyLayers(
      compLayer,
      nautilusEffects.map((e) => e.name),
    );
    bakeFromPrecomp(compLayer);
    comp.time = currentTime;

    nautilusEffects.forEach((effect) => applyTextLayer(layer, effect.name));
  } catch (e) {
    handleIssue({
      level: "WARNING",
      message: "The Bake function for text encountered an error: " + String(e),
    });
  }
}

export function bake() {
  app.beginUndoGroup("bake");
  try {
    const selectedLayers = getSelectedLayer();

    selectedLayers.forEach((layer) => {
      if (isCompLayer(layer)) {
        bakeFromPrecomp(layer);
      } else if (isTextLayer(layer)) {
        bakeFromText(layer);
      } else {
        handleIssue({
          level: "WARNING",
          message: `The layer you selected (${layer.name}) is ignored because it is not a Composition or Text Layer`,
        });
      }
    });
  } catch (e) {
    app.endUndoGroup();
    throw new Error("[bake] " + String(e), { cause: e });
  }
  app.endUndoGroup();
}
