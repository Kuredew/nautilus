import { getAllNautiFlowEffect, getAllNautilusEffect } from "../utils/effect"
import { handleError } from "../utils/error"
import { getSelectedLayer } from "../utils/layer"
import { resetButton } from "../utils/ui"

export function changeBasedOn(basedOnIndex) {
  app.beginUndoGroup("changeBasedOn")

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
        effectNames = [...getAllNautilusEffect(layer), ...getAllNautiFlowEffect(layer)]
      }

      effectNames.forEach(name => {
        const textProp = layer.property("ADBE Text Properties")
        const animatorsGroup = textProp.property("ADBE Text Animators")

        for (let k = 1; k <= animatorsGroup.numProperties; k++) {
          const animator = animatorsGroup.property(k)
          const selectorGroup = animator.property("ADBE Text Selectors")
          const selectorExpression = selectorGroup.property("ADBE Text Expressible Selector")
          const selectorExpressionAmount = selectorExpression.property(2)

          if (selectorExpressionAmount.expression.indexOf('("' + name + '")') === -1) { continue }

          const selectorExpressionBasedOn = selectorExpression.property(1)
          selectorExpressionBasedOn.setValue(basedOnIndex)
        }
      })
    })
  } catch (e) {
    throw new Error("[changeBasedOn] " + e.message)
  }
  app.endUndoGroup()
}

export function createBasedOnWindow() {
  const windowRef = new Window("palette", "Based On", undefined, { resizeable: true })
  windowRef.alignChildren = ["fill", "center"]

  const executeBasedOn = function(basedOnIndex) {
    try {
      changeBasedOn(basedOnIndex)
      windowRef.close()
    } catch (e) {
      handleError("[executeBasedOn] " + e.message)
    }
  }

  const characterButton = windowRef.add("button", undefined, "Character")
  characterButton.onClick = function () { executeBasedOn(1) }

  const characterSpacelessButton = windowRef.add("button", undefined, "Character Spaceless")
  characterSpacelessButton.onClick = function () { executeBasedOn(2) }

  const wordsButton = windowRef.add("button", undefined, "Words")
  wordsButton.onClick = function () { executeBasedOn(3) }

  const linesButton = windowRef.add("button", undefined, "Lines")
  linesButton.onClick = function () { executeBasedOn(4) }

  windowRef.add("statictext", undefined, "Dont forget to select Nautilus/NautiFlow effect first.")

  windowRef.center()
  windowRef.show()

  resetButton(this) 
}