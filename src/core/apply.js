import { nautilus } from "../state";
import { getExpr } from "../utils/expression";
import { getSelectedLayer, isCompLayer, isTextLayer } from "../utils/layer";
import { applyNautiFLowEffect, applyNautilusEffect, getAllNautilusEffect } from "../utils/effect";
import { applyLayers } from "./nautilusExpr";


export function applyComp() {
  app.beginUndoGroup("Apply Nautilus");
  try {
    const selectedLayers = getSelectedLayer();
    const applyToComp = (compLayer) => {
      applyNautilusEffect(compLayer)
      applyLayers(compLayer)
    }
    
    selectedLayers.forEach((layer) => {
      if (isCompLayer(layer)) {
        applyToComp(layer)
      } else {
        // TODO: do precomp here, select and
        // applyToComp(precompLayer)
        
      }
    })
  } catch (e) {
    throw new Error("[applyComp] " + e.message)
  }

  app.endUndoGroup();
}

const addTextAnimator = (layer, exprs) => {
  try {
    const matchNames = {
      position: "ADBE Text Position 3D",
      rotation: "ADBE Text Rotation",
      opacity: "ADBE Text Opacity",
      scale: "ADBE Text Scale 3D",
      tracking: "ADBE Text Tracking Amount"
    }

    const textProp = layer.property("ADBE Text Properties")
    
    Object.keys(exprs).forEach(propertyName => {
      const expr = exprs[propertyName]
      const animators = textProp.property("ADBE Text Animators")
      const animatorGroup = animators.addProperty("ADBE Text Animator");
      const propGroup = animatorGroup.property("ADBE Text Animator Properties");
      const valueProperty = propGroup.addProperty(matchNames[propertyName])
      const selectorGroup = animatorGroup.property("ADBE Text Selectors");
      const expSelector = selectorGroup.addProperty("ADBE Text Expressible Selector");
      
      animatorGroup.name = expr.name
      valueProperty.expression = expr.propertyExpr
      expSelector.property(2).expression = expr.selectorExpr
    })
  } catch (e) {
    throw new Error("[addTextAnimatorGroup] " + e.message)
  }
}

export function applyText() {
  app.beginUndoGroup("Apply Text");

  try {
    const selectedLayers = getSelectedLayer();
   
    selectedLayers.forEach(layer => {
      if (!isTextLayer(layer)) return
      
      if (getAllNautilusEffect(layer).length === 0) {
        applyNautiFLowEffect(layer)
        const rawSelectorExprs = [
          nautilus.expression.text.positionMask,
          nautilus.expression.text.rotationMask,
          nautilus.expression.text.trackingMask
        ]
        const finalPropertyExprs = [
          nautilus.expression.text.positionMaskValue,
          nautilus.expression.text.rotationMaskValue,
          nautilus.expression.text.trackingMaskValue
        ]

        const finalSelectorExprs = rawSelectorExprs.map((expr) => (getExpr(expr, { NAUTIFLOW_FX_NAME: nautilus.nautiFlowEffectName })))
        
        addTextAnimator(layer, {
          position: { name: "Nautiflow Position", propertyExpr: finalPropertyExprs[0], selectorExpr: finalSelectorExprs[0] },
          rotation: { name: "Nautiflow Rotation", propertyExpr: finalPropertyExprs[1], selectorExpr: finalSelectorExprs[1] },
          tracking: { name: "Nautiflow Tracking", propertyExpr: finalPropertyExprs[2], selectorExpr: finalSelectorExprs[2] },
        })
      }

      applyNautilusEffect(layer)
      const nautilusEffects = getAllNautilusEffect(layer)
      const lastNautilusEffectName = nautilusEffects[nautilusEffects.length-1]
      const defaultTemplate = 'var ctrlFx = effect("NAUTILUS_FX_NAME");\n\nPROPERTY_EXPRESSION'
      
      const rawPropertyExprs = [
        nautilus.expression.text.positionValue,
        nautilus.expression.text.rotationValue,
        nautilus.expression.text.scaleValue,
        nautilus.expression.text.opacityValue,
      ]
      const rawSelectorExprs = [
        nautilus.expression.text.position,
        nautilus.expression.text.rotation,
        nautilus.expression.text.scale,
        nautilus.expression.text.opacity,
      ]
      const finalPropertyExprs = rawPropertyExprs.map((expr) => (getExpr(defaultTemplate, { NAUTILUS_FX_NAME: lastNautilusEffectName, PROPERTY_EXPRESSION: expr })))
      const finalSelectorExprs = rawSelectorExprs.map((expr) => (getExpr(nautilus.expression.text.template, { NAUTILUS_FX_NAME: lastNautilusEffectName, PROPERTY_EXPRESSION: expr })))

      addTextAnimator(layer, {
        position: { name: "Nautilus Position", propertyExpr: finalPropertyExprs[0], selectorExpr: finalSelectorExprs[0] },
        rotation: { name: "Nautilus Rotation", propertyExpr: finalPropertyExprs[1], selectorExpr: finalSelectorExprs[1] },
        scale: { name: "Nautilus Scale", propertyExpr: finalPropertyExprs[2], selectorExpr: finalSelectorExprs[2] },
        opacity: { name: "Nautilus Opacity", propertyExpr: finalPropertyExprs[3], selectorExpr: finalSelectorExprs[3] },
      })
    })
  } catch (e) {
    app.endUndoGroup();
    throw new Error("[applyText] " + e.message)
  }

  app.executeCommand(2387);
  app.endUndoGroup();
}


export function applyNautilus() {
  if (nautilus.mode === "text") {
    applyText()
  } else if (nautilus.mode === "comp") {
    applyComp()
  }
}