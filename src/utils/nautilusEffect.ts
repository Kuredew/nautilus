import { getCompItem } from "./app";

const generateKeyframeIn = (compItem: CompItem, property: Property) => {
  property.setValueAtTime(compItem.time, 100);
  property.setValueAtTime(compItem.time + 1, 0);

  const keyframeInEase = new KeyframeEase(0, 0.1);
  const keyframeOutEase = new KeyframeEase(0, 100);

  property.setTemporalEaseAtKey(1, [keyframeInEase]);
  property.setTemporalEaseAtKey(2, [keyframeOutEase]);
};

const generateKeyframeOut = (compItem: CompItem, property: Property) => {
  property.setValueAtTime(compItem.time, 100);
  property.setValueAtTime(compItem.time + 1, 0);

  const keyframeInEase = new KeyframeEase(0, 100);
  const keyframeOutEase = new KeyframeEase(0, 0.1);

  property.setTemporalEaseAtKey(1, [keyframeInEase]);
  property.setTemporalEaseAtKey(2, [keyframeOutEase]);
};

const generateKeyframe = (options: {
  type: "IN" | "OUT";
  property: Property;
}) => {
  const compItem = getCompItem();

  switch (options.type) {
    case "IN":
      generateKeyframeIn(compItem, options.property);
      break;
    case "OUT":
      generateKeyframeOut(compItem, options.property);
      break;
  }
};

type NautilusProps = {
  strengthSlider: Property;
  modeDropdown: Property;
  positionXSlider: Property;
  positionYSlider: Property;
  opacitySlider: Property;
};

const nautilusFXExtractor = (nautilusEffect: PropertyGroup): NautilusProps => {
  const strengthSlider = nautilusEffect.property(9) as Property;
  const modeDropdown = nautilusEffect.property(6) as Property;
  const positionXSlider = nautilusEffect.property(101) as Property;
  const positionYSlider = nautilusEffect.property(102) as Property;
  const opacitySlider = nautilusEffect.property(116) as Property;

  return {
    strengthSlider,
    modeDropdown,
    positionXSlider,
    positionYSlider,
    opacitySlider,
  };
};

const transformToIN = (nautilusProps: NautilusProps) => {
  generateKeyframe({
    type: "IN",
    property: nautilusProps.strengthSlider,
  });
};

const transformToOUT = (nautilusProps: NautilusProps) => {
  generateKeyframe({
    type: "OUT",
    property: nautilusProps.strengthSlider,
  });
};

const transformToInAlternate = (nautilusProps: NautilusProps) => {
  generateKeyframe({
    type: "IN",
    property: nautilusProps.strengthSlider,
  });

  nautilusProps.modeDropdown.setValue(2);
  nautilusProps.positionXSlider.setValue(50);
  nautilusProps.positionYSlider.setValue(50);
  nautilusProps.opacitySlider.setValue(0);
};

export const nautilusFXTransformer = (options: {
  type: "IN" | "OUT" | "IN_ALTERNATE";
  effect: PropertyGroup;
}) => {
  const nautilusProps = nautilusFXExtractor(options.effect);

  switch (options.type) {
    case "IN":
      transformToIN(nautilusProps);
      break;
    case "OUT":
      transformToOUT(nautilusProps);
      break;
    case "IN_ALTERNATE":
      transformToInAlternate(nautilusProps);
      break;
  }
};

type Prop = {
  index: number;
  value: number;
};

export const nautilusFXToObject = (nautilusFX: PropertyGroup) => {
  const props: Prop[] = [];

  for (let i = 0; i <= nautilusFX.numProperties; i++) {
    const property = nautilusFX.property(i) as Property;

    props.push({
      index: i,
      value: property.value,
    });
  }
};
