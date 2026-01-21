// For Rotation
if (!ctrlValue) { ctrlValue = 0 }

var ctrlRotationStrength = ctrlFx("Rotation Strength").valueAtTime(realTime - delay);

if (ctrlIsSeparateRotation) {
  ctrlRotationStrength = ctrlFx("Rotation Y Strength").valueAtTime(realTime - delay);
}

// calculate percent value
var ctrlRotation = ctrlFx("Rotation Y") * (ctrlRotationStrength / 100);

var layerRot = value;

// final
ctrlValue = ctrlValue + ctrlRotation
layerValue += ctrlValue