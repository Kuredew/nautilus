import { readFile, readJsonFile } from "./utils/file";
import { getFile } from "./utils/nautilusLib";
import { load as settingsLoad } from "./utils/settings";

export const nautilus = {
  mode: "text",
  effectName: "Nautilus",
  nautiFlowEffectName: "NautiFlow",
  version: null,
  aboutStr: null,
  applyToCompLayers: true,
  effectObj: {
    nautilus: {
      default: null,
      in: null,
      inAlternate: null,
      out: null,
    },
    nautiflow: {
      default: null,
    },
  },
  expression: {
    text: {
      template: null,
      tracking: null,
      trackingValue: null,
      trackingMaskValue: null,
      trackingMask: null,
      position: null,
      positionValue: null,
      positionMask: null,
      positionMaskValue: null,
      skew: null,
      skewValue: null,
      rotation: null,
      rotationValue: null,
      rotationMask: null,
      rotationMaskValue: null,
      scale: null,
      scaleValue: null,
      scaleMask: null,
      scaleMaskValue: null,
      opacity: null,
      opacityValue: null,
    },
    layer: {
      template: null,
      position: null,
      rotationX: null,
      rotationY: null,
      rotationZ: null,
      scale: null,
      opacity: null,
    },
  },
  icons: {
    text: null,
    comp: null,
    about: null,
    extract: null,
    apply: null,
    basedOn: null,
    reload: null,
    bake: null,
    remove: null,
    settings: null,
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
  },
  palette: null,
};

export function load() {
  try {
    nautilus.version = readJsonFile(getFile("package.json")).version;
    nautilus.aboutStr = readFile(getFile("about.txt"));

    Object.keys(nautilus.effectObj.nautilus).forEach((key) => {
      nautilus.effectObj.nautilus[key] = getFile(`effect/nautilus/${key}.ffx`);
    });

    // Load expression for Comp Mode
    Object.keys(nautilus.expression.layer).forEach((key) => {
      nautilus.expression.layer[key] = readFile(getFile(`layer/${key}.jsx`));
    });

    nautilus.effectObj.nautiflow.default = getFile(
      "effect/nautiflow/default.ffx",
    );
    // Load expression for Text layer mode
    Object.keys(nautilus.expression.text).forEach((key) => {
      nautilus.expression.text[key] = readFile(getFile(`text/${key}.jsx`));
    });

    // Load button Icon
    Object.keys(nautilus.icons).forEach((key) => {
      nautilus.icons[key] = getFile(`icons/${key}.png`);
    });

    settingsLoad();
  } catch (e) {
    throw new Error("[load] " + e.message);
  }
}
