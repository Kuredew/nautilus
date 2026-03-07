import { createProgressWindow } from "../ui/manifest";
import { getCompItem } from "../utils/app";
import { getSelectedLayer, isTextLayer, precomposeLayers, selectLayer, unSelectLayer } from "../utils/layer";

export function extract() {
  app.beginUndoGroup("Extract")
  try {
    const selectedLayers = getSelectedLayer();

    const unSelectAllLayer = () => {
      const selectedLayers = getSelectedLayer()

      selectedLayers.forEach(layer => {
        unSelectLayer(layer)
      })
    }
    
    selectedLayers.forEach(layer => {
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

      const { windowRef, progressBar } = createProgressWindow("Nautilus Extract", "Extracting teks into shapes...", 0, groupNames.length)
      progressBar.value = 0
      windowRef.center()
      windowRef.show()

      const layerIndices = []
      groupNames.forEach((groupName, index) =>{
        const charLayer = mainShapeLayer.duplicate();
        charLayer.name = "Char_" + groupName + "_" + (index);
        layerIndices.push(charLayer.index)
        
        const charContents = charLayer.property("Contents");
        
        // remove group except index group
        for (let k = charContents.numProperties; k >= 1; k--) {
            if (k === index + 1) { continue }

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
      
        progressBar.value = index + 1
        windowRef.update()
      })

      // remove main shape layer
      mainShapeLayer.remove();

      // precompose extracted layers
      precomposeLayers(layerIndices, textLayer.name, textLayer.inPoint, textLayer.outPoint)

      windowRef.close()
    })

  } catch (e) {
    throw new Error("[extract] " + e.message)
  }
  app.endUndoGroup()
}