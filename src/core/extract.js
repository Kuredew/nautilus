import { getCompItem } from "../utils/app";
import { getSelectedLayer, isTextLayer, precomposeLayers, selectLayer, unSelectAllLayer } from "../utils/layer";
import { createProgress } from "../utils/progress";


export function extractChar(layer) {
  try {
    if (!isTextLayer(layer)) {
      throw new Error("Please only select text layer!")
    }
    const textLayer = layer

    unSelectAllLayer()
    selectLayer(layer)

    // create shapes from selected text layer
    app.executeCommand(app.findMenuCommandId("Create Shapes from Text"));

    // get shape layer from Create Shapes from Text
    const comp = getCompItem()
    const mainShapeLayer = comp.selectedLayers[0];
    const contents = mainShapeLayer.property("Contents");
    const shapeCount = contents.numProperties;

    // store group name reference
    const groupNames = [];
    for (let i = shapeCount; i >= 1; i--) {
        groupNames.push(contents.property(i).name);
    }

    const { setProgress, close } = createProgress("Nautilus Extract", "Extracting text into shapes...", { minValue: 0, maxValue: groupNames.length })

    const layerIndices = []
    groupNames.forEach((groupName, index) =>{
      const charLayer = mainShapeLayer.duplicate();
      charLayer.name = "Char_" + groupName + "_" + (index);
      layerIndices.push(charLayer.index)
      
      const charContents = charLayer.property("Contents");
      
      const id = charContents.numProperties - index
      // remove group except index group
      for (let k = charContents.numProperties; k >= 1; k--) {
        if (k === id) continue

        charContents.property(k).remove();
      }

      const rect = charLayer.sourceRectAtTime(comp.time, false);
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const currentAnchor = charLayer.transform.anchorPoint.value;
      const currentPos = charLayer.transform.position.value;
      const currentScale = charLayer.transform.scale.value;

      const deltaX = centerX - currentAnchor[0];
      const deltaY = centerY - currentAnchor[1];
      
      charLayer.transform.anchorPoint.setValue([centerX, centerY]);

      const newPosX = currentPos[0] + (deltaX * (currentScale[0] / 100));
      const newPosY = currentPos[1] + (deltaY * (currentScale[1] / 100));
      
      charLayer.transform.position.setValue([newPosX, newPosY]);
    
      setProgress(index + 1)
    })

    // remove main shape layer
    mainShapeLayer.remove();
    close()

    // precompose extracted layers
    return precomposeLayers(layerIndices, textLayer.name, textLayer.inPoint, textLayer.outPoint)
  } catch (e) {
    throw new Error('[extractChar] ' + e.message)
  }
}

export function extract() {
  app.beginUndoGroup("Extract")
  try {
    const selectedLayers = getSelectedLayer();
    
    selectedLayers.forEach(layer => {
      extractChar(layer)
    })

  } catch (e) {
    throw new Error("[extract] " + e.message)
  }
  app.endUndoGroup()
}