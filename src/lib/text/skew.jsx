/**
 * Skew Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(71).value,
  isWiggle: ctrlFx(74).value,
  wiggleSeed: ctrlFx(75).value,
  wiggleAmp: ctrlFx(76).value,
  wiggleFreq: ctrlFx(77).value
}


/**
 * Main Function
 */
function main() {
  var strength

  if (cache.isTurnOn) {
    strength = ctrlFx(72).valueAtTime(lookAtTime)
  } else {
    strength = getCtrlStrength()
  }

  /**
   * final
   */
  return strength
}