// For Rotation
if (!ctrlValue) { ctrlValue = 0 }

if (ctrlIsWiggleRotation) {
  var ctrlWiggleRotationAmp = ctrlFx("Wiggle Rot Amp").value
  var ctrlWiggleRotationFreq = ctrlFx("Wiggle Rot Freq").value

  seedRandom(ctrlFx("Wiggle Rot Seed").value + index)
  ctrlValue += (wiggle(ctrlWiggleRotationFreq, ctrlWiggleRotationAmp) - value)
}

var ctrlRotationStrength = ctrlFx("Rotation Strength").valueAtTime(realTime - delay);

if (ctrlIsSeparateRotation) {
  ctrlRotationStrength = ctrlFx("Rotation X Strength").valueAtTime(realTime - delay);
}

// calculate percent value
var ctrlRotation = ctrlFx("Rotation X") * (ctrlRotationStrength / 100);

var layerRot = value;

// final
ctrlValue = ctrlValue + ctrlRotation
layerValue += ctrlValue