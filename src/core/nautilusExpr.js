import { nautilus } from "../state";
import { getCompItem } from "../utils/app";
import { getAllNautilusEffect } from "../utils/effect";
import { getExpr } from "../utils/expression";
import { applyExprToLayer } from "../utils/layer";
import { addAnimatorWithExprs } from "./textLayer";

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
        NAUTILUS_FX_NAME_LIST: `[${config.nautilusEffectNames.map((effectName) => (`"${effectName}"`))}]`,
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
        nautilusEffectNames: nautilusEffects.map(e => e.name)
      })
    }
  } catch (e) {
    throw new Error("[applyNautilusAll] " + e.message)
  }
}


export function applyTextLayer(textLayer, effectName) {
  try {
    const defaultTemplate = 'var ctrlFx = effect("NAUTILUS_FX_NAME");\n\nPROPERTY_EXPRESSION'
    
    const rawPropertyExprs = [
      nautilus.expression.text.trackingValue,
      nautilus.expression.text.positionValue,
      nautilus.expression.text.skewValue,
      nautilus.expression.text.rotationValue,
      nautilus.expression.text.scaleValue,
      nautilus.expression.text.opacityValue,
    ]
    const rawSelectorExprs = [
      nautilus.expression.text.tracking,
      nautilus.expression.text.position,
      nautilus.expression.text.skew,
      nautilus.expression.text.rotation,
      nautilus.expression.text.scale,
      nautilus.expression.text.opacity,
    ]
    const finalPropertyExprs = rawPropertyExprs.map((expr) => (getExpr(defaultTemplate, { NAUTILUS_FX_NAME: effectName, PROPERTY_EXPRESSION: expr })))
    const finalSelectorExprs = rawSelectorExprs.map((expr) => (getExpr(nautilus.expression.text.template, { NAUTILUS_FX_NAME: effectName, PROPERTY_EXPRESSION: expr })))
    
    const configs = [
      { 
        name: "Nautilus Tracking",
        propertyName: "tracking",
        propertyExpr: finalPropertyExprs[0],
        selectorExpr: finalSelectorExprs[0] 
      },
      { 
        name: "Nautilus Position",
        propertyName: "position",
        propertyExpr: finalPropertyExprs[1],
        selectorExpr: finalSelectorExprs[1] 
      },
      { 
        name: "Nautilus Skew",
        propertyName: "skew",
        propertyExpr: finalPropertyExprs[2],
        selectorExpr: finalSelectorExprs[2] 
      },
      { 
        name: "Nautilus Rotation", 
        propertyName: "rotation",
        propertyExpr: finalPropertyExprs[3], 
        selectorExpr: finalSelectorExprs[3] 
      },
      { 
        name: "Nautilus Scale", 
        propertyName: "scale",
        propertyExpr: finalPropertyExprs[4], 
        selectorExpr: finalSelectorExprs[4] 
      },
      { 
        name: "Nautilus Opacity", 
        propertyName: "opacity",
        propertyExpr: finalPropertyExprs[5], 
        selectorExpr: finalSelectorExprs[5] 
      },
    ]

    configs.forEach(config => addAnimatorWithExprs(textLayer, config))
  } catch (e) {
    throw new Error("[applyTextLayer] " + e.message)
  }
}