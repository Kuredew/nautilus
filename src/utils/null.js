import { nautilus } from "../state"

// deprecated
export function isNautilusNull(layer) {
  return layer.name.indexOf("Nautilus CTRL") !== -1
}
export function getNautilusCtrl(selectedLayers) {
  selectedLayers.forEach(layer => {
    if (!nautilus.applyToCompLayers) {
      // deprecated
      if (!(layer.nullLayer)) { return }
      if (!(utils.isNautilusNull(layer))) { return }

    } else {
      if (!(layer instanceof CompItem)) {

      }
    }

    return layer
  })
}
// deprecated
export function createNullCtrl(selectedLayers) {
  try {
    const comp = selectedLayers[0].containingComp

    const ctrlLayer = comp.layers.addNull();
    ctrlLayer.name = "Nautilus CTRL [" + ctrlLayer.id + "]";

    const indexArray = []
    selectedLayers.forEach(layer => {
      indexArray.push(layer.index)
    })

    const lowestIndex = indexArray[0]
    indexArray.forEach(index => {
      if (index < lowestIndex) {
        lowestIndex = indexArray[i]
      }
    })

    ctrlLayer.moveBefore(comp.layer(lowestIndex))
    return ctrlLayer
  } catch (e) {
    throw new Error("[createNullCtrl] " + e.message)
  }
}
