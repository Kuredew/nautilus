import { nautilus } from "../state"
import { getExpr } from "../utils/expression"
import { addAnimatorWithExprs } from "./textLayer"

export function applyTextLayer(textLayer) {
  const rawSelectorExprs = [
    nautilus.expression.text.positionMask,
    nautilus.expression.text.rotationMask,
    nautilus.expression.text.scaleMask,
    nautilus.expression.text.trackingMask
  ]
  const finalPropertyExprs = [
    nautilus.expression.text.positionMaskValue,
    nautilus.expression.text.rotationMaskValue,
    nautilus.expression.text.scaleMaskValue,
    nautilus.expression.text.trackingMaskValue
  ]

  const finalSelectorExprs = rawSelectorExprs.map((expr) => (getExpr(expr, { NAUTIFLOW_FX_NAME: nautilus.nautiFlowEffectName })))
  
  const configs = [
    { 
      name: "Nautiflow Position", 
      propertyName: "position",
      propertyExpr: finalPropertyExprs[0], 
      selectorExpr: finalSelectorExprs[0] 
    },
    { 
      name: "Nautiflow Rotation", 
      propertyName: "rotation",
      propertyExpr: finalPropertyExprs[1], 
      selectorExpr: finalSelectorExprs[1] 
    },
    { 
      name: "Nautiflow Scale", 
      propertyName: "scale",
      propertyExpr: finalPropertyExprs[2], 
      selectorExpr: finalSelectorExprs[2] 
    },
    { 
      name: "Nautiflow Tracking", 
      propertyName: "tracking",
      propertyExpr: finalPropertyExprs[3], 
      selectorExpr: finalSelectorExprs[3] 
    },
  ]

  configs.forEach(config => addAnimatorWithExprs(textLayer, config))
}