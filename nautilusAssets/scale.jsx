// For Scale
var ctrlScaleStrength = ctrlFx("Scale Strength").valueAtTime(time - delay);
var ctrlScaleXStrength = ctrlScaleStrength;
var ctrlScaleYStrength = ctrlScaleStrength;

if (ctrlIsSeparateScale) {
  ctrlScaleXStrength = ctrlFx("Scale X Strength");
  ctrlScaleYStrength = ctrlFx("Scale Y Strength");
}

var layerScaleX = value[0];
var layerScaleY = value[1];

// follow mask, again
if (ctrlHasMask) {
  var finalLength = (length(ctrlMaskTangentsIn) + length(ctrlMaskTangentsOut)) / 2;
  layerScaleX = layerScaleX + finalLength;
  layerScaleY = layerScaleY + finalLength;
}

// calculate percent value
var ctrlScaleX = ctrlFx("Scale X") * (ctrlScaleXStrength / 100);
var ctrlScaleY = ctrlFx("Scale Y") * (ctrlScaleYStrength / 100);

[layerScaleX + ctrlScaleX, layerScaleY + ctrlScaleY]