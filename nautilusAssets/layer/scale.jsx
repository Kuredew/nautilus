/**
 * Scale Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(32).value,
  isSeparate: ctrlFx(35).value,
  modeId: ctrlFx(40).value,
  interval: ctrlFx(41).value,
  isWiggle: ctrlFx(44).value,
  wiggleSeed: ctrlFx(45).value,
  wiggleAmp: ctrlFx(46).value,
  wiggleFreq: ctrlFx(47).value,
  propValue: [
    ctrlFx(102).value,
    ctrlFx(103).value,
  ]
}


/**
 * Utility
 */
var utils = {
  createWiggle: function (seed, freq, amp, propValue) {
    seedRandom(seed, index)
    return wiggle(freq, amp) - propValue
  },
  getValue: function (propValue, strength) {
    return [
      propValue[0] * (strength[0] / 100),
      propValue[1] * (strength[1] / 100),
    ]
  },
  calculateMode: function (modeId, strength) {
    switch (modeId) {
      /**
       * Mirror Mode
       */
      case 3:
        break;
    }

    return strength
  }
}


/**
 * Main Function
 */
function main() {
  /**
   * Follow Mask
   */
  var maskInfo = getMaskInfo()
  if (maskInfo.isAvalaible) {
    var maskScale = (length(maskInfo.tangentsIn) + length(maskInfo.tangentsOut) / 2)
    initialValue = [maskScale, maskScale]
  }

  /**
   * Calculate mode (get modified strength)
   */
  var strength
  if (cache.isTurnOn) {
    if (cache.isSeparate) {
      var strengthSep = [
        ctrlFx(36).valueAtTime(lookAtTime),
        ctrlFx(37).valueAtTime(lookAtTime),
      ]
      strength = utils.calculateMode(cache.modeId, strengthSep)
    } else {
      var myStrength = ctrlFx(33).valueAtTime(lookAtTime)
      strength = utils.calculateMode(globalProp.modeId, 
        [myStrength, myStrength, myStrength]
      )
    }
  } else {
    var ctrlStrength = getCtrlStrength()
    strength = utils.calculateMode(globalProp.modeId, 
      [ctrlStrength, ctrlStrength, ctrlStrength]
    )
  }

  /**
   * final
   */
  return utils.getValue(cache.propValue, strength)
}