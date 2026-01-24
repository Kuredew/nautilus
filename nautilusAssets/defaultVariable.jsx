// Nautilus VERSION
// Kureichi<Kuredew> (https://github.com/Kuredew)

var isLegacy = IS_LEGACY

// calculate real time
var realTime = time
var ownComp
var ctrlComp = thisComp
try {
    ownComp = ctrlComp.layer("OWN_COMP_NAME")
    realTime = time + ownComp.startTime
} catch (e) {

}

var ctrl = ctrlComp.layer("NULL_LAYER_NAME");
var ctrlFxList = NAUTILUS_FX_NAME_LIST
var totalIndex = thisComp.numLayers
var realIndex = thisComp.numLayers - index

if (isLegacy) {
  realIndex = index - ctrl.index -1
}

// check mask
var ctrlHasMask = false
var ctrlMaskPath
var ctrlMaskPoint
var ctrlMaskTangentsIn
var ctrlMaskTangentsOut
try {
  ctrlMaskPath = ctrl.mask("Mask 1").maskPath;

  ctrlMaskPoint = ctrlMaskPath.points()[realIndex]
  ctrlMaskTangentsIn = ctrlMaskPath.inTangents()[realIndex]
  ctrlMaskTangentsOut = ctrlMaskPath.outTangents()[realIndex]
  ctrlHasMask = true
} catch (e) {
}

var layerValue = value;
var ctrlValue
for (var i = 0; i < ctrlFxList.length; i++) {
  var ctrlFx
  try {
    ctrlFx = ctrl.effect(ctrlFxList[i])
  } catch (e) {
    continue
  }

  var ctrlDirection = ctrlFx("Direction").value
  var ctrlMode = ctrlFx("Mode").value
  var ctrlDelay = ctrlFx("Delay") / 10
  var finalIndex = realIndex

  // change direction to reversed if "Direction" is set to "Reversed"
  if (ctrlDirection == 2) { 
    finalIndex = index - 1;
  }
  var delay = (finalIndex) * ctrlDelay;

  var ctrlIsSeparatePosition = ctrlFx("Separate Position?").value
  var ctrlIsSeparateRotation = ctrlFx("Separate Rotation?").value
  var ctrlIsSeparateScale = ctrlFx("Separate Scale?").value

  var ctrlIsWigglePosition = ctrlFx("Wiggle Position?").value
  var ctrlIsWiggleRotation = ctrlFx("Wiggle Rotation?").value
  var ctrlIsWiggleScale = ctrlFx("Wiggle Scale?").value


  PROPERTY_EXPRESSION
}

layerValue
