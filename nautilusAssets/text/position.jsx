/**
 * Position Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(11).value,
  strength: ctrlFx(12).valueAtTime(lookAtTime),
  IsSeparate: ctrlFx(14).value,
  strengthSep: [
    ctrlFx(15).valueAtTime(lookAtTime),
    ctrlFx(16).valueAtTime(lookAtTime),
    ctrlFx(17).valueAtTime(lookAtTime),
  ],
  mode: ctrlFx(20).value,
  mirrorIndex: ctrlFx(21).value,
  isWiggle: ctrlFx(24).value,
  wiggleSeed: ctrlFx(25).value,
  wiggleAmp: ctrlFx(26).value,
  wiggleFreq: ctrlFx(27).value
}



/**
 * Utility
 */
function calculateMode (modeId, strength) {
  switch (modeId) {
    /**
     * Alternate Mode
     */
    case 2:
      var p = (textIndex - 1) % 4;
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
  }

  return strength
}


/**
 * Main Function
 */
function main() {
  var mode = cache.mode
  var myStrength = cache.strength

  if (cache.isTurnOn) {
    if (cache.IsSeparate) {
      strength = calculateMode(mode, cache.strengthSep)
    } else {
      strength = calculateMode(mode, [myStrength, myStrength, myStrength])
    }
  } else {
    strength = calculateMode(ctrlGlobalMode, [globalStrength, globalStrength, globalStrength])
  }

  /**
   * final
   */
  return strength
}