/**
 * Opacity Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(89).value,
  isWiggle: ctrlFx(92).value,
  wiggleSeed: ctrlFx(93).value,
  wiggleAmp: ctrlFx(94).value,
  propValue: ctrlFx(116).value
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
    var myStrength = ctrlFx(90).valueAtTime(lookAtTime)

    newValue = utils.getValue(cache.propValue, myStrength)
  } else {
    var ctrlStrength = getCtrlStrength()
    newValue = utils.getValue(cache.propValue, ctrlStrength)
  }
  
  /**
   * Final
   */
  return newValue
}