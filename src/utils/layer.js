import { getCompItem } from "./app";

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
  } catch {
    return false;
  }
}

export function isCompLayer(layer) {
  if (layer.source instanceof CompItem) { return true }

  return false
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

const addExprToProperties = (layer, exprs) => {
  try {
    const trProp = layer.property("Transform")
    const propertyMatchNames = {
      position: "ADBE Position",
      rotation: "ADBE Rotate Z",
      rotationX: "ADBE Rotate X",
      rotationY: "ADBE Rotate Y",
      rotationZ: "ADBE Rotate Z",
      scale: "ADBE Scale",
      opacity: "ADBE Opacity",
    }

    trProp.property(propertyMatchNames.position).dimensionSeparated = false
    
    for (const key in exprs) {
      if (layer.threeDLayer) {
        if (key === "rotation") continue 
      } else {
        if (["rotationX", "rotationY", "rotationZ"].indexOf(key) !== -1) continue 
      }

      const prop = trProp.property(propertyMatchNames[key])
      if (prop && prop.canSetExpression) {
        prop.expression = exprs[key];
      }
    }
  } catch (e) {
    throw new Error("[addExprToProperties] " + e.message)
  }
}

// layer, ownCompName, compName, nullName, effectNameList
export function applyExprToLayer(layer, exprs) {
  try {
    addExprToProperties(layer, exprs)
  } catch (e) {
    throw new Error("[applyExprToLayer] " + e.message)
  }
}

export function clearExprFromLayer(layer) {
  try {
    const exprs = {
      position: "",
      rotation: "",
      rotationX: "",
      rotationY: "",
      rotationZ: "",
      scale: "",
      opacity: "",
    }
    
    addExprToProperties(layer, exprs)
  } catch (e) {
    throw new Error("[clearExprFromLayer] " + e.message)
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