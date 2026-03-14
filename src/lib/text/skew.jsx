/**
 * Skew Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(71).value,
  mode: ctrlFx(74).value,
  interval: ctrlFx(75).value,
  isWiggle: ctrlFx(78).value,
  wiggleSeed: ctrlFx(79).value,
  wiggleAmp: ctrlFx(80).value,
  wiggleFreq: ctrlFx(81).value
}


/**
 * Utility
 */
function calculateMode (modeId, strength, interval) {
  switch (modeId) {
    /**
     * Mirror Mode
     */
    case 2:
      var p = Math.ceil(realIndex / interval) % 2
      if (p !== 0) {
        strength *= 1
      } else {
        strength *= -1
      }
      break;
  }

  return strength
}


/**
 * Main Function
 */
function main() {
  var strength

  if (cache.isTurnOn) {
    var myStrength = ctrlFx(72).valueAtTime(lookAtTime)
    strength = calculateMode(cache.mode, myStrength, cache.interval)
  } else {
    var ctrlStrength = getCtrlStrength()
    
    strength = calculateMode(ctrlMode, ctrlStrength, ctrlInterval)
  }

  /**
   * final
   */
  return strength
}