import { clearExprFromLayer } from "./layer";

export function clearExprFromAllLayers(compLayer: AVLayer) {
  const innerComp = compLayer.source;
  for (let l = 1; l <= innerComp.numLayers; l++) {
    clearExprFromLayer(innerComp.layer(l));
  }
}
