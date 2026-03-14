import { getAllNautiFlowEffect, getAllNautilusEffect } from "../utils/effect";
import { getSelectedLayer, isCompLayer, isTextLayer } from "../utils/layer"
import { removeAnimatorByEffectName } from "../utils/textLayer";
import { applyTextLayer as nautiflowTextLayerApply } from "./nautiflowExpr";
import { applyLayers, applyTextLayer as nautilusTextLayerApply } from "./nautilusExpr";

export function reload() {
  try {
    const selectedLayers = getSelectedLayer()
    
    selectedLayers.forEach(layer => {
      const nautilusEffect = getAllNautilusEffect(layer)

      if (isTextLayer(layer)) {
        const nautiflowEffect = getAllNautiFlowEffect(layer)

        nautiflowEffect.forEach(effect => removeAnimatorByEffectName(layer, effect.name))
        nautilusEffect.forEach(effect => removeAnimatorByEffectName(layer, effect.name))

        nautiflowTextLayerApply(layer)
        nautilusEffect.forEach(effect => nautilusTextLayerApply(layer, effect.name))
      }
      else if (isCompLayer(layer)) {
        applyLayers(layer, nautilusEffect.map(e => e.name))
      }
    });
  } catch (e) {
    throw new Error("[core/reload] " + e.message)
  }
}