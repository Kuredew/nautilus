export type NautilusEffectObjectType = {
  binary: string;
  object: null | File;
};

export type NautiflowEffectObjectType = {
  binary: string;
  object: null | File;
};

export type EffectObjectType = {
  nautilus: NautilusEffectObjectType;
  nautiflow: NautiflowEffectObjectType;
};

export type ExpressionType = {
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

export type iconsType = {
  text: string;
  comp: string;
  about: string;
  extract: string;
  apply: string;
  basedOn: string;
  reload: string;
  bake: string;
  remove: string;
  settings: string;
};

export type settingsType = {
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

export type stateType = {
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
