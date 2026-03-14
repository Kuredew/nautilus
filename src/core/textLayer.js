import { createAnimator } from "../utils/textLayer"

export function addAnimatorWithExprs(textLayer, config) {
  try {
    const { property, selectorExpr } = createAnimator(textLayer, { name: config.name, propertyName: config.propertyName })

    property.expression = config.propertyExpr
    selectorExpr.expression = config.selectorExpr
  } catch (e) {
    throw new Error("[applyText] " + e.message)
  }
}