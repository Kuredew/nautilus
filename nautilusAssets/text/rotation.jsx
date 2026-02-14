var ctrlRotationStrength = ctrlFx("Rotation Strength").valueAtTime(realTime - delay);

if (ctrlIsSeparateRotation) {
  ctrlRotationStrength = ctrlFx("Rotation Z Strength").valueAtTime(realTime - delay);
}

ctrlRotationStrength
