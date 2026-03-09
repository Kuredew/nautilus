import { clearExprFromAllLayers } from "../utils/comp"
import { getAllNautilusEffect } from "../utils/effect"
import { getSelectedLayer, isTextLayer } from "../utils/layer"
import { applyNautilusExprToAllLayers } from "./apply"

export function removeNautilus() {
  app.beginUndoGroup("removeNautilus")

  try {
    const selectedLayers = getSelectedLayer()

    selectedLayers.forEach(layer => {
      const selectedEffect = layer.selectedProperties
      if (selectedEffect.length === 0) {
        throw new Error("Please select atleast one Nautilus Effect!")
      }

      const effectNameToRemove = []
      selectedEffect.forEach(effect => {
        effectNameToRemove.push(effect.name)
      })

      
      effectNameToRemove.forEach(effectName => {
        const effect = layer.property("ADBE Effect Parade").property(effectName);

        if (isTextLayer(layer)) {
          const textProp = layer.property("ADBE Text Properties")
          const animatorsGroup = textProp.property("ADBE Text Animators")

          for (let m = animatorsGroup.numProperties; m >= 1; m--) {
            const animator = animatorsGroup.property(m)
            const selectorGroup = animator.property("ADBE Text Selectors")
            const selectorExpression = selectorGroup.property("ADBE Text Expressible Selector")
            const selectorExpressionAmount = selectorExpression.property("ADBE Text Expressible Amount")

            if (selectorExpressionAmount?.expression?.indexOf('("' + effectName + '")') === -1) { continue }
            if (animator) animator.remove()
          }

          if (effect) effect.remove()
        } else if (layer.source instanceof CompItem) {
          if (effect) effect.remove()
          const nautilusEffects = getAllNautilusEffect(layer)
          
          if (nautilusEffects.length === 0) clearExprFromAllLayers(layer)
          else applyNautilusExprToAllLayers(layer)
        }
      })
    })
  } catch (e) {
    app.endUndoGroup()
    throw new Error("[removeNautilus] " + e.message)
  }
  app.endUndoGroup()
}

