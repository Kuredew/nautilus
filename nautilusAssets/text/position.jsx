/**
 * Position Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(12).value,
  strength: ctrlFx(13).valueAtTime(lookAtTime),
  IsSeparate: ctrlFx(15).value,
  strengthSep: [
    ctrlFx(16).valueAtTime(lookAtTime),
    ctrlFx(17).valueAtTime(lookAtTime),
    ctrlFx(18).valueAtTime(lookAtTime),
  ],
  mode: ctrlFx(21).value,
  mirrorIndex: ctrlFx(22).value,
  isWiggle: ctrlFx(25).value,
  wiggleSeed: ctrlFx(26).value,
  wiggleAmp: ctrlFx(27).value,
  wiggleFreq: ctrlFx(28).value
}



/**
 * Utility
 */
function calculateMode (modeId, strength, opts) {
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
    /**
     * Mirror Mode
     */
    case 3:
      var p = Math.ceil(textIndex / opts.mirrorIndex)
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