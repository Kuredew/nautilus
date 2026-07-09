import { nautilus } from "../state";
import { getExpr } from "../utils/expression";
import { addAnimatorWithExprs } from "./textLayer";

export function applyTextLayer(textLayer) {
  const rawSelectorExprsKey = [
    "positionMask",
    "rotationMask",
    "scaleMask",
    "trackingMask",
  ];
  const finalSelectorExprs = rawSelectorExprsKey.map((key) => {
    const rawExpr = nautilus.expression.text[key];

    if (!rawExpr) throw new Error(`Expression "${key}" is null or undefined`);

    return getExpr(rawExpr, {
      NAUTIFLOW_FX_NAME: nautilus.nautiFlowEffectName,
    });
  });

  const finalPropertyExprs = [
    nautilus.expression.text.positionMaskValue,
    nautilus.expression.text.rotationMaskValue,
    nautilus.expression.text.scaleMaskValue,
    nautilus.expression.text.trackingMaskValue,
  ];

  const configs = [
    {
      name: "Nautiflow Position",
      propertyName: "position",
      propertyExpr: finalPropertyExprs[0],
      selectorExpr: finalSelectorExprs[0],
    },
    {
      name: "Nautiflow Rotation",
      propertyName: "rotation",
      propertyExpr: finalPropertyExprs[1],
      selectorExpr: finalSelectorExprs[1],
    },
    {
      name: "Nautiflow Scale",
      propertyName: "scale",
      propertyExpr: finalPropertyExprs[2],
      selectorExpr: finalSelectorExprs[2],
    },
    {
      name: "Nautiflow Tracking",
      propertyName: "tracking",
      propertyExpr: finalPropertyExprs[3],
      selectorExpr: finalSelectorExprs[3],
    },
  ];

  configs.forEach((config) => addAnimatorWithExprs(textLayer, config));
}
