import { nautilus } from "../state";
import { nautilusFXTransformer } from "./nautilusEffect";

export function findEffects(layer: AVLayer, name: string) {
  const foundEffects = [];
  const effectGroup = layer.property("ADBE Effect Parade") as PropertyGroup;

  if (!effectGroup) return [];

  for (let i = 1; i <= effectGroup.numProperties; i++) {
    const effect = effectGroup.property(i) as PropertyGroup;
    if (effect.name.indexOf(name) !== -1) {
      foundEffects.push(effect);
    }
  }
  return foundEffects;
}

export function getAllNautilusEffect(layer: AVLayer): PropertyGroup[] {
  try {
    return findEffects(layer, nautilus.effectName);
  } catch (e) {
    throw new Error("[getAllNautilusEffect] " + String(e), { cause: e });
  }
}

export function isNautilusEffect(property: Property) {
  return property.name.indexOf(nautilus.effectName) !== -1;
}

export function getAllNautiFlowEffect(layer: AVLayer) {
  try {
    return findEffects(layer, nautilus.nautiFlowEffectName);
  } catch (e) {
    throw new Error("[getAllNautilusEffect] " + String(e), { cause: e });
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

    if (!nautilus.effectObj.nautilus.object)
      throw new Error("Nautilus effect for default animation is undefined");
    ctrlLayer.applyPreset(nautilus.effectObj.nautilus.object);

    const appliedNautilusEffect = getAllNautilusEffect(ctrlLayer);

    const lastNtlsFX = appliedNautilusEffect[
      appliedNautilusEffect.length - 1
    ] as PropertyGroup;
    if (!lastNtlsFX)
      throw new Error("Nautilus effect is not applied or not found");

    if (ctrlLayerEffects && ctrlLayerEffects.length === 0) {
      if (
        nautilus.settings.nautilus.keyframeIn &&
        !nautilus.settings.nautilus.applyAlternateAnimation
      ) {
        nautilusFXTransformer({
          type: "IN",
          effect: lastNtlsFX,
        });
      }

      if (
        nautilus.settings.nautilus.keyframeIn &&
        nautilus.settings.nautilus.applyAlternateAnimation
      ) {
        nautilusFXTransformer({
          type: `IN_ALTERNATE`,
          effect: lastNtlsFX,
        });
      }
    } else {
      if (nautilus.settings.nautilus.keyframeOut) {
        nautilusFXTransformer({
          type: "OUT",
          effect: lastNtlsFX,
        });
      }
    }

    return lastNtlsFX;
  } catch (e) {
    throw new Error("[applyNautilusEffect] " + String(e), { cause: e });
  }
}

export function applyNautiFLowEffect(layer: AVLayer) {
  try {
    if (nautilus.effectObj.nautiflow.object)
      layer.applyPreset(nautilus.effectObj.nautiflow.object);
  } catch (e) {
    throw new Error("[applyNautiFlowEffect] " + String(e), { cause: e });
  }
}
