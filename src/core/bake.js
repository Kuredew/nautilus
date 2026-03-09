import { createProgressWindow } from "../ui/manifest"
import { getSelectedLayer, isCompLayer, isTextLayer } from "../utils/layer"

const bakeFromPrecomp = (compLayer) => {
  try {
    const matchNames = [
      "ADBE Position",
      "ADBE Scale",
      "ADBE Rotate Z",
      "ADBE Opacity",
    ]

    const innerComp = compLayer.source
    const { windowRef, progressBar } = createProgressWindow("Nautilus Bake", "Baking layers...", 0, innerComp.numLayers)
    windowRef.center()
    windowRef.show()
    progressBar.value = 0

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
              cache.push({ time: t, currentValue: currentValue })
            }

            prevValue = currentValue;
          }
          cache.forEach(item => {
            prop.setValueAtTime(item.time, item.currentValue)
          })

          prop.expressionEnabled = false;
        }
      })
      progressBar.value = i
      windowRef.update()
    }
    
    windowRef.close()
  } catch (e) {
    throw new Error("[bakeFromPrecomp] " + e.message)
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
      }
    });
  } catch (e) {
    app.endUndoGroup()
    throw new Error("[bake] " + e.message)
  }
  app.endUndoGroup()
}