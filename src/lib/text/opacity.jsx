/**
 * Opacity Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(89).value,
  isWiggle: ctrlFx(92).value,
  wiggleSeed: ctrlFx(93).value,
  wiggleAmp: ctrlFx(94).value,
  wiggleFreq: ctrlFx(95).value
}


/**
 * Main Function
 */
function main() {
  var strength

  if (cache.isTurnOn) {
    strength = ctrlFx(90).valueAtTime(lookAtTime)
  } else {
    strength = getCtrlStrength()
  }

  /**
   * final
   */
  return strength
}