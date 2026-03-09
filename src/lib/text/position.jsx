/**
 * Position Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(12).value,
  IsSeparate: ctrlFx(15).value,
  mode: ctrlFx(21).value,
  interval: ctrlFx(22).value,
  isWiggle: ctrlFx(25).value,
  wiggleSeed: ctrlFx(26).value,
  wiggleAmp: ctrlFx(27).value,
  wiggleFreq: ctrlFx(28).value
}



/**
 * Utility
 */
function calculateMode (modeId, strength, interval) {
  switch (modeId) {
    /**
     * Alternate Mode
     */
    case 2:
      var p = (realIndex + Math.ceil(interval)) % 4;
      switch (p) {
        case 0:
          strength[0] *= -1; 
          strength[1] *= 0;
          break;
        case 1:
          strength[0] *= 0; 
          strength[1] *= 1;
          break;
        case 2:
          strength[0] *= 1; 
          strength[1] *= 0;
          break;
        case 3:
          strength[0] *= 0; 
          strength[1] *= -1;
          break;
      }
      break;
    /**
     * Mirror Mode
     */
    case 3:
      var p = Math.ceil(realIndex / interval) % 2
      if (p !== 0) {
        strength[0] *= 1
        strength[1] *= 1
      } else {
        strength[0] *= -1
        strength[1] *= -1
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
        ctrlFx(16).valueAtTime(lookAtTime),
        ctrlFx(17).valueAtTime(lookAtTime),
        ctrlFx(18).valueAtTime(lookAtTime),
      ],

      strength = calculateMode(mode, strengthSep, myInterval)
    } else {
      // Lazy load
      var myStrength = ctrlFx(13).valueAtTime(lookAtTime),

      strength = calculateMode(mode, [myStrength, myStrength, myStrength], myInterval)
    }
  } else {
    var ctrlStrength = getCtrlStrength()

    strength = calculateMode(ctrlMode, [ctrlStrength, ctrlStrength, ctrlStrength], ctrlInterval)
  }

  /**
   * final
   */
  return strength
}