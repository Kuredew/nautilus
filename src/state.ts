import { load as settingsLoad } from "./utils/settings";
import { stateType } from "./type";

import pkg from "../package.json";
import about from "./lib/about.txt";

import textTemplate from "./lib/text/template.jsx";

import tracking from "./lib/text/tracking.jsx";
import trackingValue from "./lib/text/trackingValue.jsx";
import trackingMask from "./lib/text/trackingMask.jsx";
import trackingMaskValue from "./lib/text/trackingMaskValue.jsx";

import textPosition from "./lib/text/position.jsx";
import textPositionValue from "./lib/text/positionValue.jsx";
import textPositionMask from "./lib/text/positionMask.jsx";
import textPositionMaskValue from "./lib/text/positionMaskValue.jsx";

import textSkew from "./lib/text/skew.jsx";
import textSkewValue from "./lib/text/skewValue.jsx";

import textRotation from "./lib/text/rotation.jsx";
import textRotationValue from "./lib/text/rotationValue.jsx";
import textRotationMask from "./lib/text/rotationMask.jsx";
import textRotationMaskValue from "./lib/text/rotationMaskValue.jsx";

import textScale from "./lib/text/rotation.jsx";
import textScaleValue from "./lib/text/scaleValue.jsx";
import textScaleMask from "./lib/text/scaleMask.jsx";
import textScaleMaskValue from "./lib/text/scaleMaskValue.jsx";

import textOpacity from "./lib/text/opacity.jsx";
import textOpacityValue from "./lib/text/opacityValue.jsx";

import layerTemplate from "./lib/layer/template.jsx";
import layerOpacity from "./lib/layer/opacity.jsx";
import layerPosition from "./lib/layer/position.jsx";
import layerRotationX from "./lib/layer/rotationX.jsx";
import layerRotationY from "./lib/layer/rotationY.jsx";
import layerRotationZ from "./lib/layer/rotationZ.jsx";
import layerScale from "./lib/layer/scale.jsx";
import { binaryStringToFileObj } from "./utils/file";

export const nautilus: stateType = {
  mode: "text",
  effectName: "Nautilus",
  nautiFlowEffectName: "NautiFlow",
  version: pkg.version,
  aboutStr: about,
  applyToCompLayers: true,
  effectObj: {
    nautilus: {
      binary: BUILD_ENV.nautilus_ffx,
      object: null,
    },
    nautiflow: {
      binary: BUILD_ENV.nautiflow_ffx,
      object: null,
    },
  },
  expression: {
    text: {
      template: textTemplate,
      tracking: tracking,
      trackingValue: trackingValue,
      trackingMaskValue: trackingMaskValue,
      trackingMask: trackingMask,
      position: textPosition,
      positionValue: textPositionValue,
      positionMask: textPositionMask,
      positionMaskValue: textPositionMaskValue,
      skew: textSkew,
      skewValue: textSkewValue,
      rotation: textRotation,
      rotationValue: textRotationValue,
      rotationMask: textRotationMask,
      rotationMaskValue: textRotationMaskValue,
      scale: textScale,
      scaleValue: textScaleValue,
      scaleMask: textScaleMask,
      scaleMaskValue: textScaleMaskValue,
      opacity: textOpacity,
      opacityValue: textOpacityValue,
    },
    layer: {
      template: layerTemplate,
      position: layerPosition,
      rotationX: layerRotationX,
      rotationY: layerRotationY,
      rotationZ: layerRotationZ,
      scale: layerScale,
      opacity: layerOpacity,
    },
  },
  icons: {
    text: BUILD_ENV.text_png,
    comp: BUILD_ENV.comp_png,
    about: BUILD_ENV.about_png,
    extract: BUILD_ENV.extract_png,
    apply: BUILD_ENV.apply_png,
    basedOn: BUILD_ENV.basedon_png,
    reload: BUILD_ENV.reload_png,
    bake: BUILD_ENV.bake_png,
    remove: BUILD_ENV.remove_png,
    settings: BUILD_ENV.settings_png,
  },
  settings: {
    nautilus: {
      keyframeIn: true,
      applyAlternateAnimation: true,
      keyframeOut: true,
    },
    progressWindow: {
      displayProgressWindow: false,
      autoCloseProgressWindow: false,
    },
    runtime: {
      displayFullErrorMessage: false,
    },
  },
  palette: null,
};

export function load() {
  try {
    nautilus.effectObj.nautilus.object = binaryStringToFileObj(
      nautilus.effectObj.nautilus.binary,
      "nautilus.ffx",
    );
    nautilus.effectObj.nautiflow.object = binaryStringToFileObj(
      nautilus.effectObj.nautiflow.binary,
      "nautiflow.ffx",
    );
    settingsLoad();
  } catch (e) {
    throw new Error("[load] " + String(e), { cause: e });
  }
}
