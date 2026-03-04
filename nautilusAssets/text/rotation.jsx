/**
 * Rotation Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(50).value,
  strength: ctrlFx(51).valueAtTime(lookAtTime),
  IsSeparate: ctrlFx(53).value,
  strengthSep: [
    ctrlFx(54).valueAtTime(lookAtTime),
    ctrlFx(55).valueAtTime(lookAtTime),
    ctrlFx(56).valueAtTime(lookAtTime),
  ],
  mode: ctrlFx(59).value,
  mirrorIndex: ctrlFx(60).value,
  isWiggle: ctrlFx(63).value,
  wiggleSeed: ctrlFx(64).value,
  wiggleAmp: ctrlFx(65).value,
  wiggleFreq: ctrlFx(66).value
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