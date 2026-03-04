/**
 * Nautilus VERSION
 * Kureichi<Kuredew> (https://github.com/Kuredew)
 */

/**
 * Global Variable Cache
 */
var ctrlFx = effect("NAUTILUS_FX_NAME")
var ctrlGlobalMode = ctrlFx(6).value
var ctrlDirection = ctrlFx(5).value
var ctrlDelay = ctrlFx(7) / 10


/**
 * Direction Logic
 */
var totalIndex = textTotal
var finalIndex = textIndex - 1
switch (ctrlDirection) {
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
var globalStrength = ctrlFx(8).valueAtTime(lookAtTime)
var strength = [globalStrength, globalStrength, globalStrength]

PROPERTY_EXPRESSION

/**
 * FINAL
 * Call Property Function
 */
main()