/* eslint-disable no-undef */
import { copy, getCompItem, paste } from "../utils/app";
import { getAllNautilusEffect } from "../utils/effect";
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
import { applyLayers, applyTextLayer } from "./nautilusExpr";

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
    if (!progress) throw new Error("Progress window not created (undefined)");

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
    if (e instanceof Error) throw new Error("[bakeFromPrecomp] " + e.message);
  }
};

function bakeFromText(layer: TextLayer) {
  try {
    const ntlsFXNames = getAllNautilusEffect(layer);
    if (!ntlsFXNames) throw new Error("Nautilus effect not found (undefined)");

    ntlsFXNames.forEach((effect) => (effect.selected = true));

    copy();

    const comp = getCompItem();
    const currentTime = comp.time;
    comp.time = comp.duration;

    const animatorsGroup = layer
      .property("ADBE Text Properties")
      .property("ADBE Text Animators");
    const nautilusEffects = getAllNautilusEffect(layer);

    if (!nautilusEffects)
      throw new Error("Nautilus effect not found (undefined)");

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
    if (!preComp)
      throw new Error(
        "Character not extracted successfully (precomp undefined)",
      );

    const compLayer = comp.layer(preComp.name) as AVLayer;

    unSelectAllLayer();
    compLayer.selected = true;
    const absoluteKeyframes = findAbsoluteKeyframe(layer);
    if (!absoluteKeyframes)
      throw new Error("Absolute keyframes not found (undefined)");

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
    if (e instanceof Error) throw new Error("[bakeFromText] " + e.message);
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
        if (!(layer instanceof TextLayer))
          throw new Error("Layer is not instance of TextLayer");

        bakeFromText(layer);
      }
    });
  } catch (e) {
    app.endUndoGroup();
    if (e instanceof Error) throw new Error("[bake] " + e.message);
  }
  app.endUndoGroup();
}
