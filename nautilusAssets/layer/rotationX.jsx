/**
 * Rotation X Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(51).value,
  modeId: ctrlFx(60).value,
  interval: ctrlFx(61).value,
  isWiggle: ctrlFx(64).value,
  wiggleSeed: ctrlFx(65).value,
  wiggleAmp: ctrlFx(66).value,
  wiggleFreq: ctrlFx(67).value,
  propValue: ctrlFx(106).value 
}

/**
 * Utility
 */
var utils = {
  getValue: function (propValue, strength) {
    return propValue * (strength / 100)
  }
}

/**
 * 
 * @returns number
 */
function main() {
  var newValue

  if (cache.isTurnOn) {
    if (cache.IsSeparate) {
      var strengthSep = ctrlFx(55).valueAtTime(lookAtTime)

      newValue = utils.getValue(cache.propValue, strengthSep)
    } else {
      var myStrength = ctrlFx(52).valueAtTime(lookAtTime),

      newValue = utils.getValue(cache.propValue, myStrength)
    }
  } else {
    var ctrlStrength = getCtrlStrength()

    newValue = utils.getValue(cache.propValue, ctrlStrength)
  }

  
  /**
   * Final
   */
  return newValue
}