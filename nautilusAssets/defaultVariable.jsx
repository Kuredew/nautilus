// Nautilus VERSION
// Kureichi<Kuredew> (https://github.com/Kuredew)

var ctrl = thisComp.layer("NULL_LAYER_NAME");
var ctrlFxList = NAUTILUS_FX_NAME_LIST
var totalIndex = thisComp.numLayers
var realIndex = thisComp.numLayers - index
var realTime = time

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
  var ctrlFx = ctrl.effect(ctrlFxList[i])

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


  PROPERTY_EXPRESSION
}

layerValue