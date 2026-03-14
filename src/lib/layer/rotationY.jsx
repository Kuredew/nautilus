/**
 * Rotation Y Function
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
  propValue: ctrlFx(111).value 
}

/**
 * Utility
 */
var utils = {
  getValue: function (propValue, strength) {
    return propValue * (strength / 100)
  },
  calculateMode: function (modeId, strength, interval) {
    switch (modeId) {
     /**
     * Mirror Mode
     */
    case 2:
      var p = Math.ceil(realIndex / interval) % 2
      if (p !== 0) {
        strength *= 1
      } else {
        strength *= -1
      }
      break;
    }
    
    return strength
  }
}

/**
 * 
 * @returns number
 */
function main() {
  var strength
  if (cache.isTurnOn) {
    if (cache.IsSeparate) {
      var strengthSep = ctrlFx(56).valueAtTime(lookAtTime)
      strength = utils.calculateMode(cache.modeId, strengthSep, cache.interval)
    } else {
      var myStrength = ctrlFx(52).valueAtTime(lookAtTime)
      strength = utils.calculateMode(cache.modeId, myStrength, cache.interval)
    }
  } else {
    var ctrlStrength = getCtrlStrength()
    strength = utils.calculateMode(globalProp.modeId - 1, ctrlStrength, globalProp.interval)
  }
  
  /**
   * Final
   */
  return utils.getValue(cache.propValue, strength)
}