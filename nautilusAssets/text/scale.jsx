/**
 * Scale Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(31).value,
  strength: ctrlFx(32).valueAtTime(lookAtTime),
  IsSeparate: ctrlFx(34).value,
  strengthSep: [
    ctrlFx(35).valueAtTime(lookAtTime),
    ctrlFx(36).valueAtTime(lookAtTime),
  ],
  mode: ctrlFx(39).value,
  mirrorIndex: ctrlFx(40).value,
  isWiggle: ctrlFx(43).value,
  wiggleSeed: ctrlFx(44).value,
  wiggleAmp: ctrlFx(45).value,
  wiggleFreq: ctrlFx(46).value
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