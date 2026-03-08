/**
 * Nautilus VERSION
 * Kureichi<Kuredew> (https://github.com/Kuredew)
 */

/**
 * Global Variable Cache
 */
var ctrl = comp("PARENT_COMP_NAME").layer("COMP_NAME")
var ctrlFxList = NAUTILUS_FX_NAME_LIST

/**
 * Other information
 */
var realTime = time + ctrl.startTime
var totalIndex = thisComp.numLayers
var realIndex = totalIndex - index

/**
 * Utility for property expression
 */
function getMaskInfo() {
  var maskInfo = {}
  try {
    maskInfo.isAvalaible = true
    maskInfo.path = ctrl.mask("Mask 1").maskPath;
    maskInfo.point = maskInfo.path.points()[realIndex]
    maskInfo.tangentsIn = maskInfo.path.inTangents()[realIndex]
    maskInfo.tangentsOut = maskInfo.path.outTangents()[realIndex]
  } catch (e) { maskInfo.isAvalaible = false }
  
  return maskInfo
}

/**
 * Loop effect list
 */
var initialValue = value
var offsetValue = 0
for (var i = 0; i < ctrlFxList.length; i++) {
  var ctrlFx
  try { ctrlFx = ctrl.effect(ctrlFxList[i]) } catch (e) { continue }

  /**
   * Global Property Object
   */
  var globalProp = {
    direction: ctrlFx(5).value,
    delay: ctrlFx(8).value / 10,
    interval: ctrlFx(7).value,
    strength: ctrlFx(9),
    modeId: ctrlFx(6).value
  }


  /**
   * Direction Logic
   */
  var finalIndex
  switch (globalProp.direction) {
    case 1:
      finalIndex = realIndex
      break;
    case 2:
      finalIndex = index - 1
      break;
    case 3:
      var middleIndex = Math.ceil(totalIndex / 2)
      finalIndex = Math.abs(middleIndex - index)
      break;
    case 4:
      var middleIndex = Math.ceil(totalIndex / 2)
      finalIndex = (middleIndex - Math.abs(middleIndex - index)) - 1
      break;
    case 5:
      seedRandom(index, true)
      finalIndex = random(totalIndex)
      break;
  }

  var lookAtTime = realTime - (finalIndex * globalProp.delay);

  function getCtrlStrength() {
    return globalProp.strength.valueAtTime(lookAtTime)
  }

  PROPERTY_EXPRESSION
  
  /**
   * FINAL
   * get calculated value and append to value
   */
  offsetValue += main()
}

initialValue + offsetValue