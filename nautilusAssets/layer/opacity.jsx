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
  wiggleFreq: ctrlFx(90).value,
  propValue: ctrlFx(111).value
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