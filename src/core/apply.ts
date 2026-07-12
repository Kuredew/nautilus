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
} from "./nautilusExpr";
import { applyTextLayer as nautiflowExprApply } from "./nautiflowExpr";
import { handleIssue } from "../utils/error";

export function applyComp(compLayer: AVLayer) {
  try {
    applyNautilusEffect(compLayer);

    const appliedNautilusEffectNames = getAllNautilusEffect(compLayer);
    if (!appliedNautilusEffectNames)
      throw new Error("Nautilus effect not found");

    applyLayers(
      compLayer,
      appliedNautilusEffectNames.map((e) => e.name),
    );
  } catch (e) {
    if (e instanceof Error)
      handleIssue({
        level: "WARNING",
        message:
          "The Apply function for Composition encountered an error: " +
          e.message,
      });
  }
}

export function applyText(textLayer: AVLayer) {
  try {
    const ntlsFXNames = getAllNautilusEffect(textLayer);
    if (!ntlsFXNames) throw new Error("Nautilus effect not found");

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
    if (e instanceof Error)
      handleIssue({
        level: "WARNING",
        message:
          "The Apply function for Text Layer encountered an error: " +
          e.message,
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
    if (e instanceof Error) throw new Error(`[applyNautilus] ${e.message}`);
  }
  app.endUndoGroup();
}
