import { clearExprFromAllLayers } from "../utils/comp"
import { getAllNautiFlowEffect, getAllNautilusEffect } from "../utils/effect"
import { getSelectedLayer, isTextLayer } from "../utils/layer"
import { findAnimatorIndexesByEffectName } from "../utils/textLayer"
import { applyLayers } from "./nautilusExpr"

export function removeNautilus() {
  app.beginUndoGroup("removeNautilus")

  try {
    const selectedLayers = getSelectedLayer()

    selectedLayers.forEach(layer => {
      const selectedEffect = layer.selectedProperties

      let effectNames = []
      if (selectedEffect.length > 0) {
        selectedEffect.forEach(effect => {
          effectNames.push(effect.name)
        })
      } else {
        effectNames = [
          ...getAllNautilusEffect(layer).map(e => e.name), 
          ...getAllNautiFlowEffect(layer).map(e => e.name)
        ]
      }
      
      effectNames.forEach(effectName => {
        const effect = layer.property("ADBE Effect Parade").property(effectName);
        if (effect) effect.remove()

        if (isTextLayer(layer)) {

          const animatorsGroup = layer.property("ADBE Text Properties").property("ADBE Text Animators")
          findAnimatorIndexesByEffectName(layer, effectName).forEach(index => animatorsGroup.property(index).remove())

        } else if (layer.source instanceof CompItem) {
          const nautilusEffects = getAllNautilusEffect(layer)
          
          if (nautilusEffects.length === 0) clearExprFromAllLayers(layer)
          else applyLayers(layer)
        }
      })
    })
  } catch (e) {
    app.endUndoGroup()
    throw new Error("[removeNautilus] " + e.message)
  }
  app.endUndoGroup()
}

