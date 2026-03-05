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
  wiggleFreq: ctrlFx(91).value,
  propValue: ctrlFx(112).value
}


/**
 * Utility
 */
var utils = {
  getValue: function(propValue, strength) {
    var range = 100 - propValue
    var calculatedRange = range * (strength / 100)
    return calculatedRange * -1
  }
}


/**
 * Main
 */
function main() {
  var newValue

  if (cache.isTurnOn) {
    newValue = utils.getValue(cache.propValue, cache.strength)
  } else {
    newValue = utils.getValue(cache.propValue, globalProp.strength)
  }
  
  /**
   * Final
   */
  return newValue
}