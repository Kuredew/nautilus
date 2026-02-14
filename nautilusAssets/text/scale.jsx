// For scale
var ctrlScaleStrength = ctrlFx("Scale Strength").valueAtTime(realTime - delay);
var ctrlScaleXStrength = ctrlScaleStrength;
var ctrlScaleYStrength = ctrlScaleStrength;

if (ctrlIsSeparateScale) {
  ctrlScaleXStrength = ctrlFx("Scale X Strength");
  ctrlScaleYStrength = ctrlFx("Scale Y Strength");
}

// final
[ctrlScaleXStrength, ctrlScaleYStrength]