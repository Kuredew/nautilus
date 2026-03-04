/**
 * Rotation Z Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(50).value,
  strength: ctrlFx(51).valueAtTime(lookAtTime),
  strengthSep: ctrlFx(56).valueAtTime(lookAtTime),
  isWiggle: ctrlFx(63).value,
  wiggleSeed: ctrlFx(64).value,
  wiggleAmp: ctrlFx(65).value,
  wiggleFreq: ctrlFx(66).value,
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
  if (maskInfo.isAvalaible && (length(maskInfo.tangentsOut) > 0)) {
    initialValue = radiansToDegrees(Math.atan2(maskInfo.tangentsOut[1], maskInfo.tangentsOut[0]));
  }

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

// // follow mask tangents (handle) if mask persist 
// if (ctrlHasMask && length(ctrlMaskTangentsOut) > 0) {
//   layerValue = radiansToDegrees(Math.atan2(ctrlMaskTangentsOut[1], ctrlMaskTangentsOut[0]));
// }