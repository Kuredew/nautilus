// defaultVariableExpression, propertyExpression, nautilusEffectName, ownCompName, compName, nullName, effectNameList
export function getExpr(template, replaceConfig) {
  try {
    if (!template) {
      throw new Error("Expression is null or undefined");
    }

    let expr = template;
    for (const key in replaceConfig) {
      expr = expr.replace(key, replaceConfig[key]);
    }

    return expr;
  } catch (e) {
    throw new Error("[getExpr] " + e.message);
  }
}
