/**
 * Rotation Z Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(51).value,
  strength: ctrlFx(52).valueAtTime(lookAtTime),
  strengthSep: ctrlFx(57).valueAtTime(lookAtTime),
  modeId: ctrlFx(60).value,
  interval: ctrlFx(61).value,
  isWiggle: ctrlFx(64).value,
  wiggleSeed: ctrlFx(65).value,
  wiggleAmp: ctrlFx(66).value,
  wiggleFreq: ctrlFx(67).value,
  propValue: ctrlFx(108).value 
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
  var maskInfo = getMaskInfo()
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