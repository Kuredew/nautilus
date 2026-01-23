// For position
if (!ctrlValue) { ctrlValue = [0, 0, 0] }

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

////////////////
// take value
///////////////
var ctrlPosXValue = ctrlFx("Position X")
var ctrlPosYValue = ctrlFx("Position Y")
var ctrlPosZValue = ctrlFx("Position Z")

//////////////////
// calculate strength
/////////////////
var ctrlPosX = ctrlPosXValue * (ctrlPosXStrength / 100);
var ctrlPosY = ctrlPosYValue * (ctrlPosYStrength / 100);
var ctrlPosZ = ctrlPosZValue * (ctrlPosZStrength / 100);

// follow mask 
if (ctrlHasMask) {
  var finalPoint
  if (isLegacy) {
    finalPoint = ctrl.toComp(ctrlMaskPoint);
  } else {
    finalPoint = ctrlMaskPoint
  }

  layerValue = []

  layerValue[0] = finalPoint[0];
  layerValue[1] = finalPoint[1];
}

// handle 2d/3d layer
var layerPosZ = 0
if (value.length == 3) { layerPosZ = value[2] }

//////////////////
// Calculate modulo 4 (for alternate mode yeah)
//////////////////
var xDir = 0;
var yDir = 0;

var yPos = ctrlPosY;
var xPos = ctrlPosX;
var zPos = ctrlPosZ;

var p = (index - 1) % 4;
if (p == 0) { yDir = -1; xDir = 0; } 
else if (p == 1) { yDir = 0; xDir = 1; }
else if (p == 2) { yDir = 1; xDir = 0; }
else if (p == 3) { yDir = 0; xDir = -1; }

// only change animate type if "Mode" is set to "Alternate"
if (ctrlMode == 2) {
	ctrlPosX = ctrlPosX * xDir;
	ctrlPosY = ctrlPosY * yDir;
}

// final
ctrlValue += [ctrlPosX, ctrlPosY, ctrlPosZ];
layerValue += ctrlValue