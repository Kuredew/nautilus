import { readFile, readJsonFile } from "./utils/file";
import { getFile } from "./utils/nautilusLib";
import { load as settingsLoad } from "./utils/settings";

type NautilusEffectObjectType = {
  default: null | File;
  in: null | File;
  inAlternate: null | File;
  out: null | File;
};

type NautiflowEffectObjectType = {
  default: null | File;
};

type EffectObjectType = {
  nautilus: NautilusEffectObjectType;
  nautiflow: NautiflowEffectObjectType;
};

type ExpressionType = {
  text: {
    template: string;
    tracking: string;
    trackingValue: string;
    trackingMaskValue: string;
    trackingMask: string;
    position: string;
    positionValue: string;
    positionMask: string;
    positionMaskValue: string;
    skew: string;
    skewValue: string;
    rotation: string;
    rotationValue: string;
    rotationMask: string;
    rotationMaskValue: string;
    scale: string;
    scaleValue: string;
    scaleMask: string;
    scaleMaskValue: string;
    opacity: string;
    opacityValue: string;
  };
  layer: {
    template: string;
    position: string;
    rotationX: string;
    rotationY: string;
    rotationZ: string;
    scale: string;
    opacity: string;
  };
};

type iconsType = {
  text: null | File;
  comp: null | File;
  about: null | File;
  extract: null | File;
  apply: null | File;
  basedOn: null | File;
  reload: null | File;
  bake: null | File;
  remove: null | File;
  settings: null | File;
};

type settingsType = {
  nautilus: {
    keyframeIn: boolean;
    applyAlternateAnimation: boolean;
    keyframeOut: boolean;
  };
  progressWindow: {
    displayProgressWindow: boolean;
    autoCloseProgressWindow: boolean;
  };
  runtime: {
    displayFullErrorMessage: boolean;
  };
};

type stateType = {
  mode: string;
  effectName: string;
  nautiFlowEffectName: "NautiFlow";
  version: string;
  aboutStr: string;
  applyToCompLayers: true;
  effectObj: EffectObjectType;
  expression: ExpressionType;
  icons: iconsType;
  settings: settingsType;
  palette: null | Window;
};

export const nautilus: stateType = {
  mode: "text",
  effectName: "Nautilus",
  nautiFlowEffectName: "NautiFlow",
  version: "",
  aboutStr: "",
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
      template: "",
      tracking: "",
      trackingValue: "",
      trackingMaskValue: "",
      trackingMask: "",
      position: "",
      positionValue: "",
      positionMask: "",
      positionMaskValue: "",
      skew: "",
      skewValue: "",
      rotation: "",
      rotationValue: "",
      rotationMask: "",
      rotationMaskValue: "",
      scale: "",
      scaleValue: "",
      scaleMask: "",
      scaleMaskValue: "",
      opacity: "",
      opacityValue: "",
    },
    layer: {
      template: "",
      position: "",
      rotationX: "",
      rotationY: "",
      rotationZ: "",
      scale: "",
      opacity: "",
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
    runtime: {
      displayFullErrorMessage: false,
    },
  },
  palette: null,
};

export function load() {
  try {
    const packageObj = readJsonFile(getFile("package.json"));
    nautilus.version = packageObj ? packageObj.version : "";
    nautilus.aboutStr = readFile(getFile("about.txt")) ?? "";

    Object.keys(nautilus.effectObj.nautilus).forEach((key) => {
      nautilus.effectObj.nautilus[
        key as keyof typeof nautilus.effectObj.nautilus
      ] = getFile(`effect/nautilus/${key}.ffx`);
    });

    // Load expression for Comp Mode
    Object.keys(nautilus.expression.layer).forEach((key) => {
      nautilus.expression.layer[key as keyof typeof nautilus.expression.layer] =
        readFile(getFile(`layer/${key}.jsx`)) ?? "";
    });

    nautilus.effectObj.nautiflow.default = getFile(
      "effect/nautiflow/default.ffx",
    );
    // Load expression for Text layer mode
    Object.keys(nautilus.expression.text).forEach((key) => {
      nautilus.expression.text[key as keyof typeof nautilus.expression.text] =
        readFile(getFile(`text/${key}.jsx`)) ?? "";
    });

    // Load button Icon
    Object.keys(nautilus.icons).forEach((key) => {
      nautilus.icons[key as keyof typeof nautilus.icons] = getFile(
        `icons/${key}.png`,
      );
    });

    settingsLoad();
  } catch (e) {
    throw new Error("[load] " + String(e));
  }
}
