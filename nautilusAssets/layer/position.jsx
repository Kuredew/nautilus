/**
 * Position Function
 * Created for Nautilus Project
 */


/**
 * Variable Cache
 */
var cache = {
  isTurnOn: ctrlFx(12).value,
  strength: ctrlFx(13).valueAtTime(lookAtTime),
  isSeparate: ctrlFx(15).value,
  strengthSep: [
    ctrlFx(16).valueAtTime(lookAtTime),
    ctrlFx(17).valueAtTime(lookAtTime),
    ctrlFx(18).valueAtTime(lookAtTime),
  ],
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
  calculateMode: function (modeId, strength) {
    switch (modeId) {
      /**
       * Alternate Mode
       */
      case 2:
        var p = (index - 1) % 4;
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
  if (maskInfo.isAvalaible) {
    initialValue = maskInfo.point
  }

  /**
   * Calculate mode (get modified strength)
   */
  var strength
  if (cache.isTurnOn) {
    if (cache.isSeparate) {
      strength = utils.calculateMode(cache.modeId, cache.strengthSep)
    } else {
      strength = utils.calculateMode(globalProp.modeId, 
        [cache.strength, cache.strength, cache.strength]
      )
    }
  } else {
    strength = utils.calculateMode(globalProp.modeId, 
      [globalProp.strength, globalProp.strength, globalProp.strength]
    )
  }

  /**
   * final
   */
  return utils.getValue(cache.propValue, strength)
}