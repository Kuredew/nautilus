/**
 * Opacity Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(84).value,
  strength: ctrlFx(85).valueAtTime(lookAtTime),
  isWiggle: ctrlFx(87).value,
  wiggleSeed: ctrlFx(88).value,
  wiggleAmp: ctrlFx(89).value,
  wiggleFreq: ctrlFx(90).value
}


/**
 * Main Function
 */
function main() {
  if (cache.isTurnOn) {
    strength = cache.strength
  }

  /**
   * final
   */
  return strength
}