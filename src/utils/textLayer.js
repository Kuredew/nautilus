import { isTextLayer } from "./layer"

export function findAnimatorIndexesByEffectName(textLayer, effectName) {
  try {
    if (!isTextLayer(textLayer)) throw new Error("Layer is not text layer!")
    const indexes = []

    const textProp = textLayer.property("ADBE Text Properties")
    const animatorsGroup = textProp.property("ADBE Text Animators")

    for (let m = animatorsGroup.numProperties; m >= 1; m--) {
      const animator = animatorsGroup.property(m)
      const selectorGroup = animator.property("ADBE Text Selectors")
      const selectorExpression = selectorGroup.property("ADBE Text Expressible Selector")
      const selectorExpressionAmount = selectorExpression.property("ADBE Text Expressible Amount")

      if (selectorExpressionAmount?.expression?.indexOf('("' + effectName + '")') === -1) { continue }
      if (animator) indexes.push(m)
    }
    
    return indexes
  } catch (e) {
    throw new Error("[findAnimatorIndexesByEffectName] " + e.message)
  }
}