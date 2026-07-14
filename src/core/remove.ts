import { clearExprFromAllLayers } from "../utils/comp";
import { getAllNautiFlowEffect, getAllNautilusEffect } from "../utils/effect";
import { handleIssue } from "../utils/error";
import { getSelectedLayer, isTextLayer } from "../utils/layer";
import { findAnimatorIndexesByEffectName } from "../utils/textLayer";

export function removeNautilus() {
  app.beginUndoGroup("removeNautilus");

  try {
    const selectedLayers = getSelectedLayer();

    selectedLayers.forEach((layer) => {
      const selectedEffect = layer.selectedProperties;

      let effectNames: string[] = [];
      if (selectedEffect.length > 0) {
        selectedEffect.forEach((effect) => {
          effectNames.push(effect.name);
        });
      } else {
        const ntlsFXNames = getAllNautilusEffect(layer);
        const ntflFXNames = getAllNautiFlowEffect(layer);

        effectNames = [
          ...(ntlsFXNames ? ntlsFXNames.map((e) => e.name) : []),
          ...(ntflFXNames ? ntflFXNames.map((e) => e.name) : []),
        ];
      }

      if (effectNames.length <= 0) {
        handleIssue({
          level: "WARNING",
          message: `We didn't find any Nautilus or Nautiflow effects in this layer (${layer.name}); this layer was skipped`,
        });

        return;
      }

      effectNames.forEach((effectName) => {
        const effect = layer
          .property("ADBE Effect Parade")
          .property(effectName);
        if (effect) effect.remove();

        if (isTextLayer(layer)) {
          const animatorsGroup = layer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators");

          const animatorIndexes = findAnimatorIndexesByEffectName(
            layer,
            effectName,
          );

          animatorIndexes.forEach((index) =>
            animatorsGroup.property(index).remove(),
          );
        } else if (layer.source instanceof CompItem) {
          const nautilusEffects = getAllNautilusEffect(layer);

          if (nautilusEffects && nautilusEffects.length === 0)
            clearExprFromAllLayers(layer);
          // else applyLayers(layer);
        }
      });
    });
  } catch (e) {
    app.endUndoGroup();
    throw new Error("[removeNautilus] " + String(e), { cause: e });
  }
  app.endUndoGroup();
}
