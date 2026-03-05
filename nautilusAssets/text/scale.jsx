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
  mirrorIndex: ctrlFx(41).value,
  isWiggle: ctrlFx(44).value,
  wiggleSeed: ctrlFx(45).value,
  wiggleAmp: ctrlFx(46).value,
  wiggleFreq: ctrlFx(47).value
}



/**
 * Utility
 */
function calculateMode (modeId, strength) {
  switch (modeId) {
    /**
     * Mirror Mode (soon)
     */
    case 2:
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