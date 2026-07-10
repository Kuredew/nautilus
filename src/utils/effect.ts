import { nautilus } from "../state";

export function findEffects(layer: AVLayer, name: string) {
  const foundEffects = [];
  const effectGroup = layer.property("ADBE Effect Parade") as PropertyGroup;

  if (!effectGroup) return [];

  for (let i = 1; i <= effectGroup.numProperties; i++) {
    const effect = effectGroup.property(i);
    if (effect.name.indexOf(name) !== -1) {
      foundEffects.push(effect);
    }
  }
  return foundEffects;
}

export function getAllNautilusEffect(layer: AVLayer) {
  try {
    return findEffects(layer, nautilus.effectName);
  } catch (e) {
    if (e instanceof Error)
      throw new Error("[getAllNautilusEffect] " + e.message);
  }
}

export function isNautilusEffect(property: Property) {
  return property.name.indexOf(nautilus.effectName) !== -1;
}

export function getAllNautiFlowEffect(layer: AVLayer) {
  try {
    return findEffects(layer, nautilus.nautiFlowEffectName);
  } catch (e) {
    if (e instanceof Error)
      throw new Error("[getAllNautilusEffect] " + e.message);
  }
}

export function applyNautilusEffect(ctrlLayer: AVLayer) {
  try {
    const comp = ctrlLayer.containingComp;
    comp.selectedLayers.forEach((layer) => {
      layer.selected = false;
    });
    comp.selectedLayers.forEach((layer) => {
      layer.selected = false;
    });

    ctrlLayer.selected = true;
    const ctrlLayerEffects = getAllNautilusEffect(ctrlLayer);

    const applyDefault = () => {
      if (!nautilus.effectObj.nautilus.default)
        throw new Error("Nautilus effect for default animation is undefined");

      ctrlLayer.applyPreset(nautilus.effectObj.nautilus.default);
    };

    if (
      ctrlLayerEffects &&
      ctrlLayerEffects.length === 0 &&
      nautilus.applyToCompLayers
    ) {
      if (
        nautilus.settings.nautilus.keyframeIn &&
        !nautilus.settings.nautilus.applyAlternateAnimation
      ) {
        if (!nautilus.effectObj.nautilus.in)
          throw new Error("Nautilus effect for in animation is undefined");

        ctrlLayer.applyPreset(nautilus.effectObj.nautilus.in);
      }

      if (
        nautilus.settings.nautilus.keyframeIn &&
        nautilus.settings.nautilus.applyAlternateAnimation
      ) {
        if (!nautilus.effectObj.nautilus.inAlternate)
          throw new Error(
            "Nautilus effect for in alternate animation is undefined",
          );
        ctrlLayer.applyPreset(nautilus.effectObj.nautilus.inAlternate);
      } else applyDefault();
    } else {
      if (nautilus.effectObj.nautilus.out)
        ctrlLayer.applyPreset(nautilus.effectObj.nautilus.out);
      if (nautilus.settings.nautilus.keyframeOut)
        if (nautilus.effectObj.nautilus.out)
          ctrlLayer.applyPreset(nautilus.effectObj.nautilus.out);
        else applyDefault();
    }

    const appliedNautilusEffectNames = getAllNautilusEffect(ctrlLayer);

    if (!appliedNautilusEffectNames)
      throw new Error("Nautilus effect not found in this layer");

    const lastNtlsFXName =
      appliedNautilusEffectNames[appliedNautilusEffectNames.length - 1];
    if (!lastNtlsFXName)
      throw new Error("Nautilus effect is not applied or not found");

    return lastNtlsFXName;
  } catch (e) {
    if (e instanceof Error)
      throw new Error("[applyNautilusEffect] " + e.message);
  }
}

export function applyNautiFLowEffect(layer: AVLayer) {
  try {
    if (nautilus.effectObj.nautiflow.default)
      layer.applyPreset(nautilus.effectObj.nautiflow.default);
  } catch (e) {
    if (e instanceof Error)
      throw new Error("[applyNautiFlowEffect] " + e.message);
  }
}
