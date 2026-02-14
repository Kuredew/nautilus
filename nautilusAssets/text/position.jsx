// For position
///////////////////////
// take strength first
///////////////////
var ctrlPosStrength = ctrlFx("Position Strength").valueAtTime(realTime - delay);
var ctrlPosXStrength = ctrlPosStrength
var ctrlPosYStrength = ctrlPosStrength
var ctrlPosZStrength = ctrlPosStrength

if (ctrlIsSeparatePosition) {
  ctrlPosXStrength = ctrlFx("Position X Strength").valueAtTime(realTime - delay);
  ctrlPosYStrength = ctrlFx("Position Y Strength").valueAtTime(realTime - delay);
  ctrlPosZStrength = ctrlFx("Position Z Strength").valueAtTime(realTime - delay);
}

//////////////////
// Calculate modulo 4 (for alternate mode yeah)
//////////////////
if (ctrlMode == 2) {
  var p = (textIndex - 1) % 4;
  if (p == 0) { ctrlPosYStrength *= -1; ctrlPosXStrength *= 0; } 
  else if (p == 1) { ctrlPosYStrength *= 0; ctrlPosXStrength *= 1; }
  else if (p == 2) { ctrlPosYStrength *= 1; ctrlPosXStrength *= 0; }
  else if (p == 3) { ctrlPosYStrength *= 0; ctrlPosXStrength *= -1; }
}

// final
[ctrlPosXStrength, ctrlPosYStrength, ctrlPosZStrength];