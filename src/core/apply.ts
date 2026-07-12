// import { nautilus } from "../state";
import { getSelectedLayer, isCompLayer, isTextLayer } from "../utils/layer";
import {
  applyNautiFLowEffect,
  applyNautilusEffect,
  getAllNautilusEffect,
} from "../utils/effect";
import {
  applyLayers,
  applyTextLayer as nautilusExprApply,
} from "../utils/nautilusExpr";
import { applyTextLayer as nautiflowExprApply } from "../utils/nautiflowExpr";
import { handleIssue } from "../utils/error";

export function applyComp(compLayer: AVLayer) {
  try {
    applyNautilusEffect(compLayer);

    const appliedNautilusEffectNames = getAllNautilusEffect(compLayer);

    applyLayers(
      compLayer,
      appliedNautilusEffectNames.map((e) => e.name),
    );
  } catch (e) {
    handleIssue({
      level: "WARNING",
      message:
        "The Apply function for Composition encountered an error: " + String(e),
    });
  }
}

export function applyText(textLayer: AVLayer) {
  try {
    const ntlsFXNames = getAllNautilusEffect(textLayer);

    if (ntlsFXNames.length === 0) {
      applyNautiFLowEffect(textLayer);
      nautiflowExprApply(textLayer);
    }

    const lastNautilusEffect = applyNautilusEffect(textLayer);
    if (!lastNautilusEffect)
      throw new Error("Nautilus effect not applied correctly!");

    nautilusExprApply(textLayer, lastNautilusEffect.name);

    app.executeCommand(2387);
  } catch (e) {
    app.endUndoGroup();
    handleIssue({
      level: "WARNING",
      message:
        "The Apply function for Text Layer encountered an error: " + String(e),
    });
  }
}

export function applyNautilus() {
  app.beginUndoGroup("apply");
  try {
    const selectedLayers = getSelectedLayer();

    selectedLayers.forEach((layer) => {
      if (isCompLayer(layer)) {
        applyComp(layer);
      } else if (isTextLayer(layer)) {
        applyText(layer);
      } else {
        handleIssue({
          level: "WARNING",
          message: `The layer you selected (${layer.name}) is ignored because it is not a Composition or Text Layer`,
        });
      }
    });
  } catch (e) {
    throw new Error(`[applyNautilus] ${String(e)}`);
  }
  app.endUndoGroup();
}
