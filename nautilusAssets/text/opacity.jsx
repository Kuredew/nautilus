/**
 * Opacity Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(85).value,
  strength: ctrlFx(86).valueAtTime(lookAtTime),
  isWiggle: ctrlFx(88).value,
  wiggleSeed: ctrlFx(89).value,
  wiggleAmp: ctrlFx(90).value,
  wiggleFreq: ctrlFx(91).value
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