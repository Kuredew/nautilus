/**
 * Scale Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(32).value,
  IsSeparate: ctrlFx(35).value,
  mode: ctrlFx(40).value,
  interval: ctrlFx(41).value,
  isWiggle: ctrlFx(44).value,
  wiggleSeed: ctrlFx(45).value,
  wiggleAmp: ctrlFx(46).value,
  wiggleFreq: ctrlFx(47).value
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
        strength[0] *= 1
        strength[1] *= 1
        strength[2] *= 1
      } else {
        strength[0] *= -1
        strength[1] *= -1
        strength[2] *= -1
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

  var mode = cache.mode
  var myInterval = cache.interval

  if (cache.isTurnOn) {
    if (cache.IsSeparate) {
      // Lazy load
      var strengthSep = [
        ctrlFx(36).valueAtTime(lookAtTime),
        ctrlFx(37).valueAtTime(lookAtTime),
      ],

      strength = calculateMode(mode, strengthSep, myInterval)
    } else {
      // Lazy Load
      var myStrength = ctrlFx(33).valueAtTime(lookAtTime),

      strength = calculateMode(mode, [myStrength, myStrength, myStrength], myInterval)
    }
  } else {
    var ctrlStrength = getCtrlStrength()

    strength = calculateMode(ctrlMode - 1, [ctrlStrength, ctrlStrength, ctrlStrength], ctrlInterval)
  }

  /**
   * final
   */
  return strength
}