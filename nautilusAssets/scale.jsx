// For Scale
if (!ctrlValue) { ctrlValue = [0, 0] }

if (ctrlIsWiggleScale) {
  var ctrlWiggleScaleAmp = ctrlFx("Wiggle Scale Amp").value
  var ctrlWiggleScaleFreq = ctrlFx("Wiggle Scale Freq").value

  seedRandom(ctrlFx("Wiggle Scale Seed").value + index)
  ctrlValue += (wiggle(ctrlWiggleScaleFreq, ctrlWiggleScaleAmp) - value)
}

var ctrlScaleStrength = ctrlFx("Scale Strength").valueAtTime(realTime - delay);
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

  layerValue = []
  layerValue[0] = layerScaleX + finalLength;
  layerValue[1] = layerScaleY + finalLength;
}

// calculate percent value
var ctrlScaleX = ctrlFx("Scale X") * (ctrlScaleXStrength / 100);
var ctrlScaleY = ctrlFx("Scale Y") * (ctrlScaleYStrength / 100);

// final
ctrlValue = ctrlValue + [ctrlScaleX, ctrlScaleY]
layerValue += ctrlValue