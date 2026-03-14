/**
 * Tracking Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(81).value,
}


/**
 * Main Function
 */
function main() {
  var strength
  
  if (cache.isTurnOn) {
    // Lazy load
    strength = ctrlFx(82).valueAtTime(lookAtTime)
  } else {
    strength = getCtrlStrength()
  }

  /**
   * final
   */
  return strength
}