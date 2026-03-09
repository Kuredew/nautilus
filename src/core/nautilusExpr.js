import { nautilus } from "../state";
import { getCompItem } from "../utils/app";
import { getAllNautilusEffect } from "../utils/effect";
import { getExpr } from "../utils/expression";
import { applyExprToLayer } from "../utils/layer";

export function applyLayer(layer, config) {
  const exprList = [
    nautilus.expression.layer.position,
    nautilus.expression.layer.scale,
    nautilus.expression.layer.opacity,
    nautilus.expression.layer.rotationX,
    nautilus.expression.layer.rotationY,
    nautilus.expression.layer.rotationZ,
  ]
  
  const finalExpr = exprList.map((expr) => (
    getExpr(
      nautilus.expression.layer.template,
      {
        VERSION: nautilus.version,
        PARENT_COMP_NAME: config.parentCompName,
        COMP_NAME: config.compName,
        NAUTILUS_FX_NAME_LIST: `[${config.nautilusEffects.map((effectName) => (`"${effectName}"`))}]`,
        FIXED_INDEX: config.layerIndex,
        PROPERTY_EXPRESSION: expr
      }
    )
  ))

  applyExprToLayer(
    layer,
    {
      position: finalExpr[0],
      scale: finalExpr[1],
      opacity: finalExpr[2],
      rotation: finalExpr[5],
      rotationX: finalExpr[3],
      rotationY: finalExpr[4],
      rotationZ: finalExpr[5]
    }
  );
}

export function applyLayers(compLayer) {
  try {
    const nautilusEffects = getAllNautilusEffect(compLayer)
    const comp = getCompItem()

    const innerComp = compLayer.source;
    for (let j = 1; j <= innerComp.numLayers; j++) {
      const layer = innerComp.layer(j)

      applyLayer(layer, {
        layerIndex: j,
        parentCompName: comp.name,
        compName: compLayer.name, 
        nautilusEffects
      })
    }
  } catch (e) {
    throw new Error("[applyNautilusAll] " + e.message)
  }
}