/**
 * Rotation Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(51).value,
  strength: ctrlFx(52).valueAtTime(lookAtTime),
  IsSeparate: ctrlFx(54).value,
  strengthSep: [
    ctrlFx(55).valueAtTime(lookAtTime),
    ctrlFx(56).valueAtTime(lookAtTime),
    ctrlFx(57).valueAtTime(lookAtTime),
  ],
  mode: ctrlFx(60).value,
  mirrorIndex: ctrlFx(61).value,
  isWiggle: ctrlFx(64).value,
  wiggleSeed: ctrlFx(65).value,
  wiggleAmp: ctrlFx(66).value,
  wiggleFreq: ctrlFx(67).value
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