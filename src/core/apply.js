import { nautilus } from "../state";
import { getCompItem } from "../utils/app";
import { replaceExpression } from "../utils/expression";
import { applyExpressionToLayer, getSelectedLayer, isTextLayer } from "../utils/layer";
import { createNullCtrl, getNautilusCtrl, isNautilusNull } from "../utils/null";
import { applyNautiFLowEffect, applyNautilusEffect, getAllNautiFlowEffect, getAllNautilusEffect } from "../utils/effect";

export function applyLayer() {
  app.beginUndoGroup("Apply Nautilus");
  try {
    const comp = getCompItem()

    const selectedLayers = getSelectedLayer();

    let ctrlLayer
    let ctrlLayerEffectNameList
    if (!nautilus.applyToCompLayers) {
      const ctrlLayer = getNautilusCtrl(selectedLayers);
      if (!ctrlLayer) {
        ctrlLayer = createNullCtrl(selectedLayers)
      }

      applyNautilusEffect(ctrlLayer)
      ctrlLayerEffectNameList = getAllNautilusEffect(ctrlLayer)
    }

    
    selectedLayers.forEach((layer) => {
      // ignore nautilus null ctrl
      if (isNautilusNull(layer)) { return }

      if (nautilus.applyToCompLayers) {
        if (!(layer.source instanceof CompItem)) {
          alert("Layer '" + layer.name + "'" +  " skipped because this layer is not instance of preComp/Comp Layer")
          return
        }

        ctrlLayer = layer

        applyNautilusEffect(ctrlLayer)
        ctrlLayerEffectNameList = getAllNautilusEffect(ctrlLayer)

        const innerComp = layer.source;
        for (let j = 1; j <= innerComp.numLayers; j++) {
          applyExpressionToLayer(innerComp.layer(j), {
            ownCompName: layer.name, 
            compName: comp.name, 
            nullName: ctrlLayer.name, 
            effectNameList: ctrlLayerEffectNameList
          });
        }

        return
      } else {
        applyExpressionToLayer(layer, null, null, ctrlLayer.name, ctrlLayerEffectNameList);
      }
    })
  } catch (e) {
    throw new Error("[applyLayer] " + e.message)
  }

  app.endUndoGroup();
}


export function applyText() {
  app.beginUndoGroup("Apply Nautilus");

  const addTextAnimator = (name, layer, propertyType, selectorExpression, valueExpression) => {
    try {
      const textProp = layer.property("ADBE Text Properties")
      const animators = textProp.property("ADBE Text Animators")
      const animatorGroup = animators.addProperty("ADBE Text Animator");
      animatorGroup.name = name

      const propGroup = animatorGroup.property("ADBE Text Animator Properties");

      if (propertyType === "position") matchName = "ADBE Text Position 3D"
      else if (propertyType === "rotation") matchName = "ADBE Text Rotation"
      else if (propertyType === "opacity") matchName = "ADBE Text Opacity"
      else if (propertyType === "scale") matchName = "ADBE Text Scale 3D"
      else if (propertyType === "tracking") matchName = "ADBE Text Tracking Amount"

      // stop if matchname not found
      if (matchName === "") {
        return
      }

      // Add Property based on PropertyType
      const valueProperty = propGroup.addProperty(matchName);

      // add expression to valueProperty
      if (valueExpression) {
        valueProperty.expression = valueExpression
      } else {
        alert("ValueExpression is empty!")
      }

      const selectorGroup = animatorGroup.property("ADBE Text Selectors");
      const expSelector = selectorGroup.addProperty("ADBE Text Expressible Selector");
      
      if (selectorExpression) {
        expSelector.property(2).expression = selectorExpression
      }
    } catch (e) {
      throw new Error("[addTextAnimatorGroup] " + e.message)
    }
  }

  const getExpression = (propertyExpression, nautilusEffectName, isPropertyValue) => {
    let template = nautilus.expression.text.template

    if (isPropertyValue) {
      template = "var ctrlFx = effect('" + nautilusEffectName + "');\n\nPROPERTY_EXPRESSION"
    }

    return replaceExpression({
      template: template,
      propertyExpression: propertyExpression,
      nautilusEffectName: nautilusEffectName
    }
    );
  }

  const getMaskExpression = (propertyExpression, nautiFlowEffectName) => {
    if (!propertyExpression) return ""

    return propertyExpression.replace("NAUTIFLOW_FX_NAME", nautiFlowEffectName)
  }

  try {
    const selectedLayers = getSelectedLayer();
   
    selectedLayers.forEach(layer => {
      if (!isTextLayer(layer)) {
        alert("Layer '" + layer.name + "'" +  " skipped because this layer is not text layer!")
        return
      }

      applyNautilusEffect(layer)
      const nautilusEffectList = getAllNautilusEffect(layer)
      const lastNautilusEffectName = nautilusEffectList[nautilusEffectList.length - 1]

      let lastNautiFlowEffectName
      const addAnimatorMaskUtil = (name, propertyType) => {
        addTextAnimator(
          name, 
          layer, 
          propertyType, 
          getMaskExpression(nautilus.expression.text[propertyType + "Mask"], lastNautiFlowEffectName), 
          nautilus.expression.text[propertyType + "MaskValue"]
        )
      }

      const addAnimatorUtil = (name, propertyType) => {
        addTextAnimator(
          name, 
          layer, 
          propertyType, 
          getExpression(nautilus.expression.text[propertyType], lastNautilusEffectName), 
          getExpression(nautilus.expression.text[propertyType + "Value"], lastNautilusEffectName, true)
        )
      }

      if (nautilusEffectList.length === 1) {
        applyNautiFLowEffect(layer)
        const nautiFlowEffectList = getAllNautiFlowEffect(layer)
        lastNautiFlowEffectName = nautiFlowEffectList[nautiFlowEffectList.length - 1]

        addAnimatorMaskUtil("NAUTILUS_MASK_POS", "position")
        addAnimatorMaskUtil("NAUTILUS_MASK_ROT", "rotation")
        addAnimatorMaskUtil("NAUTILUS_MASK_SCL", "scale")
        addAnimatorMaskUtil("NAUTILUS_TRACKING", "tracking")
      }

      addAnimatorUtil("NAUTILUS_POS", "position")
      addAnimatorUtil("NAUTILUS_ROT", "rotation")
      addAnimatorUtil("NAUTILUS_SCL", "scale")
      addAnimatorUtil("NAUTILUS_OPACITY", "opacity")
    })
  } catch (e) {
    throw new Error("[applyText] " + e.message)
  }

  app.executeCommand(2387);
  app.endUndoGroup();
}


export function applyNautilus() {
  if (nautilus.mode === "text") {
    applyText()
  } else if (nautilus.mode === "comp") {
    applyLayer()
  }
}