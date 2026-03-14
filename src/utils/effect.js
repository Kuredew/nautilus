import { nautilus } from "../state";

export function findEffects(layer, name) {
  const foundEffects = [];
  const effectGroup = layer.property("ADBE Effect Parade");

  if (!effectGroup) return [];

  for (let i = 1; i <= effectGroup.numProperties; i++) {
    const effect = effectGroup.property(i);
    if (effect.name.indexOf(name) !== -1) {
      foundEffects.push(effect);
    }
  }
  return foundEffects;
}


export function getAllNautilusEffect(layer) {
  try {
    return findEffects(layer, nautilus.effectName)
  } catch (e) {
    throw new Error("[getAllNautilusEffect] " + e.message)
  }
}

export function isNautilusEffect(property) {
  return property.name.indexOf(nautilus.effectName) !== -1
}

export function getAllNautiFlowEffect(layer) {
  return findEffects(layer, nautilus.nautiFlowEffectName)
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
    const ctrlLayerEffects = getAllNautilusEffect(ctrlLayer);
    
    const applyDefault = () => {
      ctrlLayer.applyPreset(nautilus.effectObj.nautilus.default)
    }

    if (ctrlLayerEffects.length === 0 && nautilus.applyToCompLayers) {
      if (nautilus.settings.nautilus.keyframeIn) ctrlLayer.applyPreset(nautilus.effectObj.nautilus.in)
      else applyDefault()
    } else {
      ctrlLayer.applyPreset(nautilus.effectObj.nautilus.out);
      if (nautilus.settings.nautilus.keyframeOut) ctrlLayer.applyPreset(nautilus.effectObj.nautilus.out)
      else applyDefault()
    }

    return getAllNautilusEffect(ctrlLayer)
  } catch (e) {
    throw new Error("[applyNautilusEffect] " + e.message)
  }
}

export function applyNautiFLowEffect(layer) {
  try {
    layer.applyPreset(nautilus.effectObj.nautiflow.default);
  } catch (e) {
    throw new Error("[applyNautiFlowEffect] " + e.message)
  }
}