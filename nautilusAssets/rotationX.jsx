// For Rotation
if (!ctrlValue) { ctrlValue = 0 }

var ctrlRotationStrength = ctrlFx("Rotation Strength").valueAtTime(time - delay);

if (ctrlIsSeparateRotation) {
  ctrlRotationStrength = ctrlFx("Rotation X Strength").valueAtTime(time - delay);
}

// calculate percent value
var ctrlRotation = ctrlFx("Rotation X") * (ctrlRotationStrength / 100);

var layerRot = value;

// final
ctrlValue = ctrlValue + ctrlRotation
layerValue += ctrlValue