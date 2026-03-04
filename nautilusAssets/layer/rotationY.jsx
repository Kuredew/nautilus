/**
 * Rotation Y Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(50).value,
  strength: ctrlFx(51).valueAtTime(lookAtTime),
  strengthSep: ctrlFx(55).valueAtTime(lookAtTime),
  isWiggle: ctrlFx(63).value,
  wiggleSeed: ctrlFx(64).value,
  wiggleAmp: ctrlFx(65).value,
  wiggleFreq: ctrlFx(66).value,
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
  var finalValue

  if (cache.isTurnOn) {
    if (cache.IsSeparate) {
      finalValue = utils.getValue(cache.propValue, cache.strengthSep)
    } else {
      finalValue = utils.getValue(cache.propValue, cache.strength)
    }
  } else {
    finalValue = utils.getValue(cache.propValue, globalProp.strength)
  }

  
  /**
   * Final
   */
  return finalValue
}