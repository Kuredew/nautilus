import { nautilus } from "../state"
import { handleError } from "../utils/error"
import { getSelectedLayer } from "../utils/layer"
import { resetButton } from "../utils/ui"

export function changeBasedOn(basedOnIndex) {
  app.beginUndoGroup("changeBasedOn")

  try {
    const selectedLayers = getSelectedLayer()

    selectedLayers.forEach(layer => {
      const selectedEffect = layer.selectedProperties
      if (selectedEffect.length === 0) {
        throw new Error("Please select atleast one Nautilus Effect!")
      }

      selectedEffect.forEach(effect => {
        const textProp = layer.property("ADBE Text Properties")
        const animatorsGroup = textProp.property("ADBE Text Animators")

        for (let k = 1; k <= animatorsGroup.numProperties; k++) {
          const animator = animatorsGroup.property(k)
          const selectorGroup = animator.property("ADBE Text Selectors")
          const selectorExpression = selectorGroup.property("ADBE Text Expressible Selector")
          const selectorExpressionAmount = selectorExpression.property(2)

          if (selectorExpressionAmount.expression.indexOf('("' + effect.name + '")') === -1) { continue }

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
  nautilus.basedOnPanel = new Window("palette", "Based On", undefined, { resizeable: true })
  nautilus.basedOnPanel.alignChildren = ["fill", "center"]

  const executeBasedOn = function(basedOnIndex) {
    try {
      changeBasedOn(basedOnIndex)
      nautilus.basedOnPanel.close()
    } catch (e) {
      handleError("[executeBasedOn] " + e.message)
    }
  }

  const characterButton = nautilus.basedOnPanel.add("button", undefined, "Character")
  characterButton.onClick = function () { executeBasedOn(1) }

  const characterSpacelessButton = nautilus.basedOnPanel.add("button", undefined, "Character Spaceless")
  characterSpacelessButton.onClick = function () { executeBasedOn(2) }

  const wordsButton = nautilus.basedOnPanel.add("button", undefined, "Words")
  wordsButton.onClick = function () { executeBasedOn(3) }

  const linesButton = nautilus.basedOnPanel.add("button", undefined, "Lines")
  linesButton.onClick = function () { executeBasedOn(4) }

  nautilus.basedOnPanel.add("statictext", undefined, "Dont forget to select Nautilus/NautiFlow effect first.")

  nautilus.basedOnPanel.center()
  nautilus.basedOnPanel.show()

  resetButton(this) 
}