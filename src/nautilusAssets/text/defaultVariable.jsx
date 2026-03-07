/**
 * Nautilus VERSION
 * Kureichi<Kuredew> (https://github.com/Kuredew)
 */

/**
 * Global Variable Cache
 */
var ctrlFx = effect("NAUTILUS_FX_NAME")
var ctrlMode = ctrlFx(6).value
var ctrlInterval = ctrlFx(7).value
var ctrlDirection = ctrlFx(5).value
var ctrlDelay = ctrlFx(8) / 10
var ctrlStrength


/**
 * Direction Logic
 */
var totalIndex = textTotal
var realIndex = textIndex - 1
var finalIndex
switch (ctrlDirection) {
  case 1:
    finalIndex = realIndex
    break;
  case 2:
    finalIndex = totalIndex - textIndex;
    break;
  case 3:
    var middleIndex = Math.ceil(totalIndex / 2)
    finalIndex = Math.abs(middleIndex - textIndex)
    break;
  case 4:
    var middleIndex = Math.ceil(totalIndex / 2)
    finalIndex = (middleIndex - Math.abs(middleIndex - textIndex)) - 1
    break;
  case 5:
    seedRandom(index, true)
    finalIndex = random(totalIndex)
    break;
}

var lookAtTime = time - (finalIndex * ctrlDelay)

// Lazy load (only call valueAtTime if needed)
function getCtrlStrength() {
  return ctrlFx(9).valueAtTime(lookAtTime)
}

PROPERTY_EXPRESSION

/**
 * FINAL
 * Call Property Function
 */
main()