// For position

///////////////////////
// take strength first
///////////////////
var ctrlPosStrength = ctrlFx("Position Strength").valueAtTime(time - delay);
var ctrlPosXStrength = ctrlPosStrength
var ctrlPosYStrength = ctrlPosStrength
var ctrlPosZStrength = ctrlPosStrength

if (ctrlIsSeparatePosition) {
  ctrlPosXStrength = ctrlFx("Position X Strength").valueAtTime(time - delay);
  ctrlPosYStrength = ctrlFx("Position Y Strength").valueAtTime(time - delay);
  ctrlPosZStrength = ctrlFx("Position Z Strength").valueAtTime(time - delay);
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

var layerPosX = value[0];
var layerPosY = value[1];

// follow mask 
if (ctrlHasMask) {
  var finalPoint = ctrl.toComp(ctrlMaskPoint);

  layerPosX = finalPoint[0];
  layerPosY = finalPoint[1];
}

// handle 2d/3d layer
var layerPosZ = 0
if (value.length == 3) { layerPosZ = value[2] }

//////////////////
// Calculate modulo 4 (for alternate mode yeah)
//////////////////
var xDir = 0;
var yDir = 0;

var yPos = layerPosY + ctrlPosY;
var xPos = layerPosX + ctrlPosX;
var zPos = layerPosZ + ctrlPosZ;

var p = (index - 1) % 4;
if (p == 0) { yDir = -1; xDir = 0; } 
else if (p == 1) { yDir = 0; xDir = 1; }
else if (p == 2) { yDir = 1; xDir = 0; }
else if (p == 3) { yDir = 0; xDir = -1; }

// only change animate type if "Mode" is set to "Alternate"
if (ctrlMode == 2) {
	var xPos = layerPosX + (ctrlPosX * xDir);
	var yPos = layerPosY + (ctrlPosY * yDir);

	// if x/yPos is 0, fallback to own pos
	if (xPos == 0) { xPos = layerPosX; }
	if (yPos == 0) { yPos = layerPosY; }
}


// final
[xPos, yPos, zPos]