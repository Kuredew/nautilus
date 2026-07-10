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
    if (e instanceof Error) throw new Error(`[applyComp] ${e.message}`);
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
    if (e instanceof Error) throw new Error(`[applyText] ${e.message}`);
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
      }
    });
  } catch (e) {
    if (e instanceof Error) throw new Error(`[applyNautilus] ${e.message}`);
  }
  app.endUndoGroup();
}
