import { nautilus } from "../state";

export function getAllEffectName(layer, effectName) {
  const effectsArray = []
  for (let i = 1; i <= layer.numProperties; i++) {
    const prop = layer.property(i);
    if (!(prop.matchName === "ADBE Effect Parade")) { continue }

    for (let j = 1; j <= prop.numProperties; j++) {
      const effectPropertyName = prop.property(j).name
      if (effectPropertyName.indexOf(effectName) === -1) { continue }

      effectsArray.push(effectPropertyName);
    }
  }
  return effectsArray
}

export function applyNautilusEffect(ctrlLayer) {
  try {
    const comp = ctrlLayer.containingComp
    comp.selectedLayers.forEach(layer => {
      layer.selected = false;
    })
    comp.selectedLayers.forEach(layer => {
      layer.selected = false;
    })

    ctrlLayer.selected = true
    const ctrlLayerEffectNameList = getAllNautilusEffect(ctrlLayer);

    if (ctrlLayerEffectNameList.length === 0 && nautilus.applyToCompLayers) {
      ctrlLayer.applyPreset(nautilus.firstPresetFileObj);
    } else {
      ctrlLayer.applyPreset(nautilus.secondPresetFileObj);
    }

    return getAllNautilusEffect(ctrlLayer)
  } catch (e) {
    throw new Error("[applyNautilusEffect] " + e.message)
  }
}

export function getAllNautilusEffect(layer) {
  return getAllEffectName(layer, nautilus.effectName)
}

export function isNautilusEffect(property) {
  return property.name.indexOf(nautilus.effectName) !== -1
}

export function applyNautiFLowEffect(layer) {
  try {
    layer.applyPreset(nautilus.nautiFlowPresetFileObj);
  } catch (e) {
    throw new Error("[applyNautiFlowEffect] " + e.message)
  }
}

export function getAllNautiFlowEffect(layer) {
  return getAllEffectName(layer, nautilus.nautiFlowEffectName)
}