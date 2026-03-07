import { nautilus } from "../state";
import { getCompItem } from "./app";
import { replaceExpression } from "./expression";

export function getSelectedLayer() {
  const comp = getCompItem()

  const selectedLayers = comp.selectedLayers;
  if (selectedLayers.length == 0) {
    throw new Error("[getSelectedLayer] Please select atleast 1 layer!");
  }

  return selectedLayers
}

export function isTextLayer(layer) {
  try {
    const dummyVar = layer.text.sourceText; 
    return true;
  } catch (e) {
    return false;
  }
}

export function precomposeLayers(layerIndices, name, inPoint, outPoint) {
  try {
    const comp = getCompItem()

    const preComp = comp.layers.precompose(
      layerIndices,
      name
    );

    preComp.duration = outPoint - inPoint
    for (let j = 1; j <= preComp.numLayers; j++) {
      preComp.layer(j).startTime -= inPoint;
    }

    comp.selectedLayers[0].startTime = inPoint;
  } catch (e) {
    throw new Error("[precomposeLayers] " + e.message)
  }

}

// layer, ownCompName, compName, nullName, effectNameList
export function applyExpressionToLayer(layer, config) {
  try {
    const trProp = layer.property("Transform")

    const posProp = trProp.property("Position");
    posProp.dimensionSeparated = false;

    const RotProp = trProp.property("Rotation");
    const RotXProp = trProp.property("X Rotation");
    const RotYProp = trProp.property("Y Rotation");
    const RotZProp = trProp.property("Z Rotation");
    const SclProp = trProp.property("Scale");
    const OpcProp = trProp.property("Opacity"); 

    const executeReplaceExpression = function(expression) {
      const replaceConfig = {
        template: nautilus.expression.layer.template,
        propertyExpression: expression,
        ownCompName: config.ownCompName,
        compName: config.compName,
        nullName: config.nullName,
        effectNameList: config.effectNameList
      }
      
      return replaceExpression(replaceConfig)
    }

    posProp.expression = executeReplaceExpression(nautilus.expression.layer.position)
    SclProp.expression = executeReplaceExpression(nautilus.expression.layer.scale)
    OpcProp.expression = executeReplaceExpression(nautilus.expression.layer.opacity)

    if (layer.threeDLayer) {
      RotXProp.expression = executeReplaceExpression(nautilus.expression.layer.rotationX)
      RotYProp.expression = executeReplaceExpression(nautilus.expression.layer.rotationY)
      RotZProp.expression = executeReplaceExpression(nautilus.expression.layer.rotationZ)
    } else {
      RotProp.expression = executeReplaceExpression(nautilus.expression.layer.rotationZ)
    }
  } catch (e) {
    throw new Error("[applyExpressionToLayer] " + e.message)
  }
}

export function clearExpressionFromLayer(layer) {
  try {
    const trProp = layer.property("Transform")

    const posProp = trProp.property("Position");
    posProp.dimensionSeparated = false;

    const RotProp = trProp.property("Rotation");
    const RotXProp = trProp.property("X Rotation");
    const RotYProp = trProp.property("Y Rotation");
    const RotZProp = trProp.property("Z Rotation");
    const SclProp = trProp.property("Scale");
    const OpcProp = trProp.property("Opacity");

    posProp.expression = ""
    SclProp.expression = ""
    OpcProp.expression = ""

    if (layer.threeDLayer) {
      RotXProp.expression = ""
      RotYProp.expression = ""
      RotZProp.expression = ""
    } else {
      RotProp.expression = ""
    }
  } catch (e) {
    throw new Error("[clearExpressionFromLayer] " + e.message)
  }
}

export function selectLayer(layer) {
  layer.selected = true
  layer.selected = true
}

export function unSelectLayer(layer) {
  layer.selected = false
  layer.selected = false
}