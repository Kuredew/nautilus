import { getAllNautiFlowEffect, getAllNautilusEffect } from "../utils/effect";
import { handleIssue } from "../utils/error";
import { getSelectedLayer, isCompLayer, isTextLayer } from "../utils/layer";
import { removeAnimatorByEffectName } from "../utils/textLayer";
import { applyTextLayer as nautiflowTextLayerApply } from "../utils/nautiflowExpr";
import {
  applyLayers,
  applyTextLayer as nautilusTextLayerApply,
} from "../utils/nautilusExpr";

export function reload() {
  try {
    app.beginUndoGroup("reload");

    const selectedLayers = getSelectedLayer();

    selectedLayers.forEach((layer) => {
      const nautilusEffect = getAllNautilusEffect(layer);
      if (!nautilusEffect) {
        handleIssue({
          level: "WARNING",
          message: `An error occurred while retrieving the name of all Nautilus effects from the layer (${layer.name}); this layer was skipped`,
        });

        return;
      }

      if (isTextLayer(layer)) {
        const nautiflowEffect = getAllNautiFlowEffect(layer);
        if (!nautiflowEffect) {
          handleIssue({
            level: "WARNING",
            message: `An error occurred while retrieving the name of all Nautiflow effects from the layer (${layer.name}); this layer was skipped`,
          });

          return;
        }

        if (nautiflowEffect.length <= 0 && nautilusEffect.length <= 0) {
          handleIssue({
            level: "WARNING",
            message: `We didn't find any Nautilus or Nautiflow effects in this layer (${layer.name}); this layer was skipped`,
          });

          return;
        }

        if (nautiflowEffect.length > 0) {
          nautiflowEffect.forEach((effect) =>
            removeAnimatorByEffectName(layer, effect.name),
          );

          nautiflowTextLayerApply(layer);
        }

        if (nautilusEffect.length > 0) {
          nautilusEffect.forEach((effect) =>
            removeAnimatorByEffectName(layer, effect.name),
          );
          nautilusEffect.forEach((effect) =>
            nautilusTextLayerApply(layer, effect.name),
          );
        }
      } else if (isCompLayer(layer)) {
        if (nautilusEffect.length <= 0) {
          handleIssue({
            level: "WARNING",
            message: `The layer you selected (${layer.name}) is ignored because it is not a layer to which Nautilus has been applied.`,
          });

          return;
        }

        applyLayers(
          layer,
          nautilusEffect.map((e) => e.name),
        );
      } else {
        handleIssue({
          level: "WARNING",
          message: `The layer you selected (${layer.name}) is ignored because it is not a Composition or Text Layer`,
        });
      }
    });

    app.endUndoGroup();
  } catch (e) {
    app.endUndoGroup();

    throw new Error("[core/reload] " + String(e), { cause: e });
  }
}
