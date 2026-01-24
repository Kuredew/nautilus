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
  ctrlRotationStrength = ctrlFx("Rotation Z Strength").valueAtTime(realTime - delay);
}

// calculate percent value
var ctrlRotation = ctrlFx("Rotation Z") * (ctrlRotationStrength / 100);

var layerRot = value;

// follow mask tangents (handle) if mask persist 
if (ctrlHasMask && length(ctrlMaskTangentsOut) > 0) {
  layerValue = radiansToDegrees(Math.atan2(ctrlMaskTangentsOut[1], ctrlMaskTangentsOut[0]));
}

// final
ctrlValue = ctrlValue + ctrlRotation
layerValue += ctrlValue