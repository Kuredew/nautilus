/**
 * Position Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(12).value,
  isSeparate: ctrlFx(15).value,
  modeId: ctrlFx(21).value,
  interval: ctrlFx(22).value,
  isWiggle: ctrlFx(25).value,
  wiggleSeed: ctrlFx(26).value,
  wiggleAmp: ctrlFx(27).value,
  wiggleFreq: ctrlFx(28).value,
  propValue: [
    ctrlFx(97).value,
    ctrlFx(98).value,
    ctrlFx(99).value,
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
      propValue[2] * (strength[2] / 100)
    ]
  },
  calculateMode: function (modeId, strength, interval) {
    switch (modeId) {
      /**
       * Alternate Mode
       */
      case 2:
        var p = (realIndex) % 4;
        switch (p) {
          case 0:
            strength[0] *= -1; 
            strength[1] *= 0;
            break;
          case 1:
            strength[0] *= 0; 
            strength[1] *= 1;
            break;
          case 2:
            strength[0] *= 1; 
            strength[1] *= 0;
            break;
          case 3:
            strength[0] *= 0; 
            strength[1] *= -1;
            break;
        }
        break;
       /**
       * Mirror Mode
       */
      case 3:
        var p = Math.ceil(realIndex / interval) % 2
        if (p !== 0) {
          strength[0] *= 1
          strength[1] *= 1
        } else {
          strength[0] *= -1
          strength[1] *= -1
        }
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
    initialValue = maskInfo.point
  }

  /**
   * Calculate mode (get modified strength)
   */
  var strength
  if (cache.isTurnOn) {
    if (cache.isSeparate) {
      // Lazy load
      var strengthSep = [
        ctrlFx(16).valueAtTime(lookAtTime),
        ctrlFx(17).valueAtTime(lookAtTime),
        ctrlFx(18).valueAtTime(lookAtTime),
      ]

      strength = utils.calculateMode(cache.modeId, strengthSep, cache.interval)
    } else {
      var myStrength = ctrlFx(13).valueAtTime(lookAtTime)

      strength = utils.calculateMode(
        globalProp.modeId, 
        [myStrength, myStrength, myStrength],
        cache.interval
      )
    }
  } else {
    var ctrlStrength = getCtrlStrength()

    strength = utils.calculateMode(
      globalProp.modeId, 
      [ctrlStrength, ctrlStrength, ctrlStrength],
      globalProp.interval
    )
  }

  /**
   * final
   */
  return utils.getValue(cache.propValue, strength)
}