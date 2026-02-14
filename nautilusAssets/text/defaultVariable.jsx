// Nautilus VERSION
// Kureichi<Kuredew> (https://github.com/Kuredew)

seedRandom(index, true)

var ctrlFx = effect("NAUTILUS_FX_NAME")
var totalIndex = textTotal
var realIndex = textIndex - 1
var realTime = time

var layerValue = value;
var ctrlValue

var ctrlDirection = ctrlFx("Direction").value
var ctrlMode = ctrlFx("Mode").value
var ctrlDelay = ctrlFx("Delay") / 10
var finalIndex = realIndex

/////////////////////
// direction logic
/////////////////////
if (ctrlDirection == 2) { 
  finalIndex = totalIndex - textIndex;
} else if (ctrlDirection == 3) {
  var middleIndex = Math.ceil(totalIndex / 2)
  finalIndex = Math.abs(middleIndex - textIndex)
} else if (ctrlDirection == 4) {
  var middleIndex = Math.ceil(totalIndex / 2)
  finalIndex = (middleIndex - Math.abs(middleIndex - textIndex)) - 1
} else if (ctrlDirection == 5) {
  finalIndex = random(totalIndex)
}

var delay = (finalIndex) * ctrlDelay;

var ctrlIsSeparatePosition = ctrlFx("Separate Position?").value
var ctrlIsSeparateRotation = ctrlFx("Separate Rotation?").value
var ctrlIsSeparateScale = ctrlFx("Separate Scale?").value

var ctrlIsWigglePosition = ctrlFx("Wiggle Position?").value
var ctrlIsWiggleRotation = ctrlFx("Wiggle Rotation?").value
var ctrlIsWiggleScale = ctrlFx("Wiggle Scale?").value


PROPERTY_EXPRESSION