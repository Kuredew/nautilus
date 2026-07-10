import { createAnimator } from "../utils/textLayer";

export function addAnimatorWithExprs(
  textLayer: AVLayer,
  config: {
    name: string;
    propertyName: string;
    propertyExpr: string;
    selectorExpr: string;
  },
) {
  try {
    const animator = createAnimator(textLayer, {
      name: config.name,
      propertyName: config.propertyName,
    });
    if (!animator) throw new Error("Animator is not created (undefined)");

    animator.property.expression = config.propertyExpr;
    animator.selectorExpr.expression = config.selectorExpr;
  } catch (e) {
    if (e instanceof Error) throw new Error("[applyText] " + e.message);
  }
}
