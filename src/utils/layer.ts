import { getCompItem } from "./app";

type ExpressionsConfig = {
  position: string;
  rotation: string;
  rotationX: string;
  rotationY: string;
  rotationZ: string;
  scale: string;
  opacity: string;
};

export function getSelectedLayer() {
  const comp = getCompItem();

  const selectedLayers = comp.selectedLayers as AVLayer[];
  if (selectedLayers.length == 0) {
    throw new Error("[getSelectedLayer] Please select atleast 1 layer!");
  }

  return selectedLayers;
}

export function isTextLayer(layer: AVLayer) {
  try {
    if (layer instanceof TextLayer) {
      return true;
    } else return false;
  } catch {
    return false;
  }
}

export function isCompLayer(layer: AVLayer) {
  if (layer.source instanceof CompItem) {
    return true;
  }

  return false;
}

export function precomposeLayers(
  layerIndices: number[],
  name: string,
  inPoint: number,
  outPoint: number,
) {
  try {
    const comp = getCompItem();

    const preComp = comp.layers.precompose(layerIndices, name);

    preComp.duration = outPoint - inPoint;
    for (let j = 1; j <= preComp.numLayers; j++) {
      preComp.layer(j).startTime -= inPoint;
    }

    comp.selectedLayers[0].startTime = inPoint;

    return preComp;
  } catch (e) {
    throw new Error("[precomposeLayers] " + String(e), { cause: e });
  }
}

const addExprToProperties = (layer: AVLayer, exprs: ExpressionsConfig) => {
  try {
    const trProp = layer.property("Transform");
    const propertyMatchNames = {
      position: "ADBE Position",
      rotation: "ADBE Rotate Z",
      rotationX: "ADBE Rotate X",
      rotationY: "ADBE Rotate Y",
      rotationZ: "ADBE Rotate Z",
      scale: "ADBE Scale",
      opacity: "ADBE Opacity",
    };

    const posProp = trProp.property(propertyMatchNames.position) as Property;

    posProp.dimensionsSeparated = false;

    for (const key in exprs) {
      if (layer.threeDLayer) {
        if (key === "rotation") continue;
      } else {
        if (["rotationX", "rotationY", "rotationZ"].indexOf(key) !== -1)
          continue;
      }

      const prop = trProp.property(
        propertyMatchNames[key as keyof typeof propertyMatchNames],
      ) as Property;
      if (prop && prop.canSetExpression) {
        prop.expression = exprs[key as keyof typeof exprs];
      }
    }
  } catch (e) {
    throw new Error("[addExprToProperties] " + String(e), { cause: e });
  }
};

// layer, ownCompName, compName, nullName, effectNameList
export function applyExprToLayer(layer: AVLayer, exprs: ExpressionsConfig) {
  try {
    addExprToProperties(layer, exprs);
  } catch (e) {
    throw new Error("[applyExprToLayer] " + String(e), { cause: e });
  }
}

export function clearExprFromLayer(layer: AVLayer) {
  try {
    const exprs: ExpressionsConfig = {
      position: "",
      rotation: "",
      rotationX: "",
      rotationY: "",
      rotationZ: "",
      scale: "",
      opacity: "",
    };

    addExprToProperties(layer, exprs);
  } catch (e) {
    throw new Error("[clearExprFromLayer] " + String(e), { cause: e });
  }
}

export function selectLayer(layer: AVLayer) {
  layer.selected = true;
  layer.selected = true;
}

export function unSelectLayer(layer: AVLayer) {
  layer.selected = false;
  layer.selected = false;
}

export function unSelectAllLayer() {
  try {
    const selectedLayers = getSelectedLayer();

    selectedLayers.forEach((layer) => {
      if (layer instanceof AVLayer) unSelectLayer(layer);
    });
  } catch {
    // dont do anything if getSelectedLayer throw an error
  }
}

export function findAbsoluteKeyframe(layer: AVLayer) {
  try {
    const comp = getCompItem();

    let maxTime = 0;
    let minTime = comp.duration;

    function searchProperties(group: PropertyGroup) {
      for (let i = 1; i <= group.numProperties; i++) {
        const prop = group.property(i) as PropertyGroup;

        if (prop instanceof Property) {
          if (prop.numKeys > 0) {
            const firstKeyTime = prop.keyTime(1);
            const lastKeyTime = prop.keyTime(prop.numKeys);
            if (lastKeyTime > maxTime) {
              maxTime = lastKeyTime;
            }

            if (firstKeyTime < minTime) {
              minTime = firstKeyTime;
            }
          }
        } else if (
          prop.propertyType === PropertyType.INDEXED_GROUP ||
          prop.propertyType === PropertyType.NAMED_GROUP ||
          prop instanceof PropertyGroup
        ) {
          searchProperties(prop);
        }
      }
    }

    searchProperties(layer);
    return { minTime: minTime, maxTime: maxTime };
  } catch (e) {
    throw new Error("[findAbsoluteKeyframe] " + String(e), { cause: e });
  }
}
