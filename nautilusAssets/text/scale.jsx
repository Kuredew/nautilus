/**
 * Scale Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(32).value,
  strength: ctrlFx(33).valueAtTime(lookAtTime),
  IsSeparate: ctrlFx(35).value,
  strengthSep: [
    ctrlFx(36).valueAtTime(lookAtTime),
    ctrlFx(37).valueAtTime(lookAtTime),
  ],
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
      var p = Math.ceil(textIndex / interval) % 2
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
  var myStrength = cache.strength
  var myInterval = cache.interval

  if (cache.isTurnOn) {
    if (cache.IsSeparate) {
      strength = calculateMode(mode, cache.strengthSep, myInterval)
    } else {
      strength = calculateMode(mode, [myStrength, myStrength, myStrength], myInterval)
    }
  } else {
    strength = calculateMode(ctrlMode - 1, [ctrlStrength, ctrlStrength, ctrlStrength], ctrlInterval)
  }

  /**
   * final
   */
  return strength
}