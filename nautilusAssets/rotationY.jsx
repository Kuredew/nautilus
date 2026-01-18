// For Rotation
var ctrlRotationStrength = ctrlFx("Rotation Strength").valueAtTime(time - delay);

if (ctrlIsSeparateRotation) {
  ctrlRotationStrength = ctrlFx("Rotation Y Strength").valueAtTime(time - delay);
}

// calculate percent value
var ctrlRotation = ctrlFx("Rotation Y") * (ctrlRotationStrength / 100);

var layerRot = value;

layerRot + ctrlRotation