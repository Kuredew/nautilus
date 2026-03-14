import { copy, getCompItem, paste } from "../utils/app"
import { getAllNautilusEffect } from "../utils/effect"
import { findAbsoluteKeyframe, getSelectedLayer, isCompLayer, isTextLayer, unSelectAllLayer } from "../utils/layer"
import { createProgress } from "../utils/progress"
import { findAnimatorIndexesByEffectName } from "../utils/textLayer"
import { extractChar } from "./extract"
import { applyLayers, applyTextLayer } from "./nautilusExpr"

const bakeFromPrecomp = (compLayer) => {
  try {
    const matchNames = [
      "ADBE Position",
      "ADBE Scale",
      "ADBE Rotate Z",
      "ADBE Opacity",
    ]

    const innerComp = compLayer.source
    const { setProgress, close } = createProgress("Nautilus Bake", "Baking expression into keyframes...",{ minValue: 0, maxValue: innerComp.numLayers })

    for (let i = 1; i <= innerComp.numLayers; i++) {
      const layer = innerComp.layer(i)
      const transformGrp = layer.property("ADBE Transform Group")

      matchNames.forEach(matchName => {
        const prop = transformGrp.property(matchName)
        if (prop.canSetExpression && prop.expressionEnabled) {
          const startTime = innerComp.workAreaStart;
          const endTime = innerComp.workAreaDuration + startTime;

          let prevValue = null;

          const cache = []
          for (let t = startTime; t <= endTime; t += innerComp.frameDuration) {
            const currentValue = prop.valueAtTime(t, false);

            if (prevValue === null || currentValue.toString() !== prevValue.toString()) {
              cache.push({ time: t, value: currentValue })
            }

            prevValue = currentValue;
          }
          cache.forEach(item => {
            const newKeyIndex = prop.addKey(item.time);
            // eslint-disable-next-line no-undef
            prop.setInterpolationTypeAtKey(newKeyIndex, KeyframeInterpolationType.LINEAR, KeyframeInterpolationType.HOLD);
            prop.setValueAtKey(newKeyIndex, item.value)
          })

          prop.expressionEnabled = false;
        }
      })
      setProgress(i)
    }
    
    close()
  } catch (e) {
    throw new Error("[bakeFromPrecomp] " + e.message)
  }
}

function bakeFromText(layer) {
  try {
    getAllNautilusEffect(layer).forEach(effect => effect.selected = true)
    copy()

    const comp = getCompItem()
    const currentTime = comp.time
    comp.time = comp.duration
    

    const animatorsGroup = layer.property("ADBE Text Properties").property("ADBE Text Animators")
    const nautilusEffects = getAllNautilusEffect(layer)
    nautilusEffects.forEach(effect => 
      findAnimatorIndexesByEffectName(layer, effect.name).forEach(index => 
        animatorsGroup.property(index).remove()
    ))

    const preComp = extractChar(layer)
    const compLayer = comp.layer(preComp.name)

    unSelectAllLayer()
    compLayer.selected = true
    comp.time = findAbsoluteKeyframe(layer).minTime
    paste()
    
    applyLayers(compLayer)
    bakeFromPrecomp(compLayer)
    comp.time = currentTime
    
    nautilusEffects.forEach(effect => applyTextLayer(layer, effect.name))
  } catch (e) {
    throw new Error("[bakeFromText] " + e.message)
  }
}

export function bake() {
  app.beginUndoGroup("bake")
  try {
    const selectedLayers = getSelectedLayer()

    selectedLayers.forEach(layer => {
      if (isCompLayer(layer)) {
        bakeFromPrecomp(layer)
      } else if (isTextLayer(layer)) {
        // TODO: Check if text layer is nautilus applied text layer.
        // after that, extract text layer into preComp, and do bakeFromPrecomp()
        bakeFromText(layer)
      }
    });
  } catch (e) {
    app.endUndoGroup()
    throw new Error("[bake] " + e.message)
  }
  app.endUndoGroup()
}