import { nautilus } from "../state";
import { Keyframe, Prop } from "../type";
import { getCompItem } from "./app";
import { handleIssue } from "./error";
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

export function applyNautilusEffect(ctrlLayer: AVLayer, propData?: Prop[]) {
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

    if (propData) {
      extractPropsToFX(propData, lastNtlsFX);
    } else {
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
    }
    return lastNtlsFX;
  } catch (e) {
    throw new Error("[applyNautilusEffect] " + String(e), { cause: e });
  }
}

export function applyNautiFLowEffect(layer: AVLayer, propData?: Prop[]) {
  try {
    if (nautilus.effectObj.nautiflow.object) {
      layer.applyPreset(nautilus.effectObj.nautiflow.object);
    }

    const ntflFXList = getAllNautiFlowEffect(layer);
    const lastNtflFX = ntflFXList[ntflFXList.length - 1];

    if (!lastNtflFX) {
      throw new Error(
        `Can't found nautiflow effect in this layer (${layer.name})`,
      );
    }
    if (propData) {
      extractPropsToFX(propData, lastNtflFX);
    }

    return lastNtflFX;
  } catch (e) {
    throw new Error("[applyNautiFlowEffect] " + String(e), { cause: e });
  }
}

export const FXToProps = (FX: PropertyGroup) => {
  try {
    const props: Prop[] = [];
    for (let i = 1; i <= FX.numProperties; i++) {
      try {
        const property = FX.property(i) as Property;
        const keyframes: Keyframe[] = [];

        if (property.numKeys > 0) {
          for (let i = 1; i <= property.numKeys; i++) {
            try {
              let timeOffset = 0;
              if (i > 1) {
                timeOffset = property.keyTime(i) - property.keyTime(1);
              }

              const keyframeObj: Keyframe = {
                timeOffset: timeOffset,
                value: property.keyValue(i),
                inType: property.keyInInterpolationType(i),
                outType: property.keyOutInterpolationType(i),
                easeIn: [],
                easeOut: [],
              };

              if (
                keyframeObj.inType === KeyframeInterpolationType.BEZIER ||
                keyframeObj.outType === KeyframeInterpolationType.BEZIER
              ) {
                const easeInObj = property.keyInTemporalEase(i);
                const easeOutObj = property.keyInTemporalEase(i);
                easeInObj.forEach((easeIn) => {
                  keyframeObj.easeIn.push({
                    speed: easeIn.speed,
                    influence: easeIn.influence,
                  });
                });
                easeOutObj.forEach((easeOut) => {
                  keyframeObj.easeOut.push({
                    speed: easeOut.speed,
                    influence: easeOut.influence,
                  });
                });
              }

              keyframes.push(keyframeObj);
            } catch (e) {
              handleIssue({
                level: "WARNING",
                message: "Error while extracting keyframe: " + String(e),
              });
            }
          }
        }

        props.push({
          name: property.name,
          index: i,
          value: property.value,
          keyframes,
        });
      } catch {
        continue;
      }
    }

    return props;
  } catch (e) {
    throw new Error(`[effect/FXToObject] ${String(e)}`, {
      cause: e,
    });
  }
};

export function extractPropsToFX(props: Prop[], FX: PropertyGroup) {
  try {
    const time = getCompItem().time;

    props.forEach((prop) => {
      const property = FX.property(prop.index) as Property;

      try {
        if (prop.keyframes.length > 0) {
          prop.keyframes.forEach((key, index) => {
            property.setValueAtTime(time + key.timeOffset, key.value);
            property.setInterpolationTypeAtKey(
              index + 1,
              key.inType,
              key.outType,
            );

            key.easeIn.forEach((ease) => {
              const keyEase = new KeyframeEase(ease.speed, ease.influence);
              property.setTemporalEaseAtKey(index + 1, [keyEase]);
            });
            key.easeOut.forEach((ease) => {
              const keyEase = new KeyframeEase(ease.speed, ease.influence);
              property.setTemporalEaseAtKey(index + 1, [keyEase]);
            });
          });
        } else {
          property.setValue(prop.value);
        }
      } catch {
        return;
      }
    });
  } catch (e) {
    throw new Error(`[extractPropsToFX] ${String(e)}`, { cause: e });
  }
}
