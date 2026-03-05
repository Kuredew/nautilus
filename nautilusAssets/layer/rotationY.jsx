/**
 * Rotation Y Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(51).value,
  strength: ctrlFx(52).valueAtTime(lookAtTime),
  strengthSep: ctrlFx(56).valueAtTime(lookAtTime),
  modeId: ctrlFx(60).value,
  interval: ctrlFx(61).value,
  isWiggle: ctrlFx(64).value,
  wiggleSeed: ctrlFx(65).value,
  wiggleAmp: ctrlFx(66).value,
  wiggleFreq: ctrlFx(67).value,
  propValue: ctrlFx(107).value 
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