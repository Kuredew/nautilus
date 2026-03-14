import { nautilus } from "../state";
import { getSelectedLayer, isCompLayer, isTextLayer } from "../utils/layer";
import { applyNautiFLowEffect, applyNautilusEffect, getAllNautilusEffect } from "../utils/effect";
import { applyLayers, applyTextLayer as nautilusExprApply } from "./nautilusExpr";
import { applyTextLayer as nautiflowExprApply } from "./nautiflowExpr"


export function applyComp() {
  app.beginUndoGroup("Apply Nautilus");
  try {
    const selectedLayers = getSelectedLayer();
    const applyToComp = (compLayer) => {
      applyNautilusEffect(compLayer)
      applyLayers(compLayer)
    }
    
    selectedLayers.forEach((layer) => {
      if (isCompLayer(layer)) {
        applyToComp(layer)
      } else {
        // TODO: do precomp here, select and
        // applyToComp(precompLayer)
        
      }
    })
  } catch (e) {
    throw new Error("[applyComp] " + e.message)
  }

  app.endUndoGroup();
}

export function applyText() {
  app.beginUndoGroup("Apply Text");

  try {
    const selectedLayers = getSelectedLayer();
   
    selectedLayers.forEach(layer => {
      if (!isTextLayer(layer)) return
      
      if (getAllNautilusEffect(layer).length === 0) {
        applyNautiFLowEffect(layer)
        nautiflowExprApply(layer)
      }

      applyNautilusEffect(layer)
      const nautilusEffects = getAllNautilusEffect(layer)
      const lastNautilusEffect = nautilusEffects[nautilusEffects.length-1]

      nautilusExprApply(layer, lastNautilusEffect.name)
    })
  } catch (e) {
    app.endUndoGroup();
    throw new Error("[applyText] " + e.message)
  }

  app.executeCommand(2387);
  app.endUndoGroup();
}


export function applyNautilus() {
  if (nautilus.mode === "text") {
    applyText()
  } else if (nautilus.mode === "comp") {
    applyComp()
  }
}