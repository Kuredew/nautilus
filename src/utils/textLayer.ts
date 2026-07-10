import { isTextLayer } from "./layer";

export function findAnimatorIndexesByEffectName(
  textLayer: AVLayer,
  effectName: string,
) {
  try {
    if (!isTextLayer(textLayer)) throw new Error("Layer is not text layer!");
    const indexes = [];

    const textProp = textLayer.property("ADBE Text Properties");
    const animatorsGroup = textProp.property(
      "ADBE Text Animators",
    ) as PropertyGroup;

    for (let m = animatorsGroup.numProperties; m >= 1; m--) {
      const animator = animatorsGroup.property(m);
      const selectorGroup = animator.property("ADBE Text Selectors");
      const selectorExpression = selectorGroup.property(
        "ADBE Text Expressible Selector",
      );
      const selectorExpressionAmount = selectorExpression.property(
        "ADBE Text Expressible Amount",
      ) as Property;

      if (
        selectorExpressionAmount?.expression?.indexOf(
          '("' + effectName + '")',
        ) === -1
      ) {
        continue;
      }
      if (animator) indexes.push(m);
    }

    return indexes;
  } catch (e) {
    if (e instanceof Error)
      throw new Error("[findAnimatorIndexesByEffectName] " + e.message);
  }
}

export function removeAnimatorByEffectName(
  textLayer: AVLayer,
  effectName: string,
) {
  try {
    const animatorsGroup = textLayer
      .property("ADBE Text Properties")
      .property("ADBE Text Animators");
    const animatorIndexes = findAnimatorIndexesByEffectName(
      textLayer,
      effectName,
    );

    if (animatorIndexes)
      animatorIndexes.forEach((index) =>
        animatorsGroup.property(index).remove(),
      );
  } catch (e) {
    if (e instanceof Error)
      throw new Error("[removeAnimatorByEffectName] " + e.message);
  }
}

export function createAnimator(
  textLayer: AVLayer,
  config: {
    name: string;
    propertyName: string;
  },
) {
  try {
    const matchNames: Record<string, string> = {
      position: "ADBE Text Position 3D",
      rotation: "ADBE Text Rotation",
      opacity: "ADBE Text Opacity",
      scale: "ADBE Text Scale 3D",
      tracking: "ADBE Text Tracking Amount",
      skew: "ADBE Text Skew",
    };

    const textProp = textLayer.property("ADBE Text Properties");

    const animators = textProp.property("ADBE Text Animators") as PropertyGroup;
    const animatorGroup = animators.addProperty("ADBE Text Animator");
    const propGroup = animatorGroup.property(
      "ADBE Text Animator Properties",
    ) as PropertyGroup;
    const property = propGroup.addProperty(
      matchNames[config.propertyName],
    ) as Property;
    const selectorGroup = animatorGroup.property(
      "ADBE Text Selectors",
    ) as PropertyGroup;
    const selectorExpr = selectorGroup.addProperty(
      "ADBE Text Expressible Selector",
    );
    animatorGroup.name = config.name;

    return {
      animatorGroup,
      property,
      selectorExpr: selectorExpr.property(2) as Property,
    };
  } catch (e) {
    if (e instanceof Error) throw new Error("[createAnimator] " + e.message);
  }
}
