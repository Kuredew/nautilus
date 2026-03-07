import { clearExpressionFromLayer, getSelectedLayer, isTextLayer } from "../utils/layer"

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
            const selectorExpressionAmount = selectorExpression.property(2)

            if (selectorExpressionAmount.expression.indexOf('("' + effect.name + '")') === -1) { continue }
            
            animator.remove()
          }

          effect.remove()
        } else if (layer.source instanceof CompItem) {
          const innerComp = layer.source
          for (let l = 1; l <= innerComp.numLayers; l++) {
            clearExpressionFromLayer(innerComp.layer(l))
          }

          effect.remove()
        }
      })
    })
  } catch (e) {
    throw new Error("[removeNautilus] " + e.message)
  }
  app.endUndoGroup()
}

