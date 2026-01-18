// For Rotation
var ctrlRotationStrength = ctrlFx("Rotation Strength").valueAtTime(time - delay);

if (ctrlIsSeparateRotation) {
  ctrlRotationStrength = ctrlFx("Rotation Z Strength").valueAtTime(time - delay);
}

// calculate percent value
var ctrlRotation = ctrlFx("Rotation Z") * (ctrlRotationStrength / 100);

var layerRot = value;

// follow mask tangents (handle) if mask persist 
if (ctrlHasMask && length(ctrlMaskTangentsOut) > 0) {
  layerRot = radiansToDegrees(Math.atan2(ctrlMaskTangentsOut[1], ctrlMaskTangentsOut[0]));
}

layerRot + ctrlRotation