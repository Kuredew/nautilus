import { getFileObj, readFile, readJsonFile } from "./utils/file"

export const nautilus = {
    mode: "text",
    effectName: "Nautilus",
    nautiFlowEffectName: "NautiFlow",
    firstPresetFileObj: null,
    secondPresetFileObj: null,
    nautiFlowPresetFileObj: null,
    version: null,
    aboutStr: null,
    applyToCompLayers: true,
    expression: {
      text: {
        template: null,
        trackingMaskValue: null,
        trackingMask: null,
        position: null,
        positionValue: null,
        positionMask: null,
        positionMaskValue: null,
        rotation: null,
        rotationValue: null,
        rotationMask: null,
        rotationMaskValue: null,
        scale: null,
        scaleValue: null,
        scaleMask: null,
        scaleMaskValue: null,
        opacity: null,
        opacityValue: null,
      },
      layer: {
        template: null,
        position: null,
        rotationX: null,
        rotationY: null,
        rotationZ: null,
        scale: null,
        opacity: null
      }
    },
    icons: {
      text: null,
      comp: null,
      about: null,
      extract: null,
      apply: null,
      basedOn: null,
      remove: null,
      settings: null
    },
    palette: null
}


export function load() {
  try {
    // Load expression for Comp Mode
    nautilus.firstPresetFileObj = getFileObj("Nautilus.ffx")
    nautilus.secondPresetFileObj = getFileObj("Nautilus2.ffx")
    nautilus.version = readJsonFile("package.json").version
    nautilus.aboutStr = readFile("about.txt")
    nautilus.expression.layer.template = readFile("layer/template.jsx")
    nautilus.expression.layer.position = readFile("layer/position.jsx")
    nautilus.expression.layer.rotationX = readFile("layer/rotationX.jsx")
    nautilus.expression.layer.rotationY = readFile("layer/rotationY.jsx")
    nautilus.expression.layer.rotationZ = readFile("layer/rotationZ.jsx")
    nautilus.expression.layer.opacity = readFile("layer/opacity.jsx")
    nautilus.expression.layer.scale = readFile("layer/scale.jsx")

    // Load expression for Text layer mode
    nautilus.nautiFlowPresetFileObj = getFileObj("NautiFLow.ffx")
    nautilus.expression.text.template = readFile("text/template.jsx")
    nautilus.expression.text.trackingMaskValue = readFile("text/trackingMaskValue.jsx")
    nautilus.expression.text.trackingMask = readFile("text/trackingMask.jsx")
    nautilus.expression.text.position = readFile("text/position.jsx")
    nautilus.expression.text.positionValue = readFile("text/positionValue.jsx")
    nautilus.expression.text.positionMask = readFile("text/positionMask.jsx")
    nautilus.expression.text.positionMaskValue = readFile("text/positionMaskValue.jsx")
    nautilus.expression.text.rotation = readFile("text/rotation.jsx")
    nautilus.expression.text.rotationValue = readFile("text/rotationValue.jsx")
    nautilus.expression.text.rotationMask = readFile("text/rotationMask.jsx")
    nautilus.expression.text.rotationMaskValue = readFile("text/rotationMaskValue.jsx")
    nautilus.expression.text.scale = readFile("text/scale.jsx")
    nautilus.expression.text.scaleValue = readFile("text/scaleValue.jsx")
    nautilus.expression.text.scaleMask = readFile("text/scaleMask.jsx")
    nautilus.expression.text.scaleMaskValue = readFile("text/scaleMaskValue.jsx")
    nautilus.expression.text.opacity = readFile("text/opacity.jsx")
    nautilus.expression.text.opacityValue = readFile("text/opacityValue.jsx")
    
    // Load button Icon
    nautilus.icons.text = getFileObj("icons/text.png")
    nautilus.icons.comp = getFileObj("icons/comp.png")
    nautilus.icons.about = getFileObj("icons/about.png")
    nautilus.icons.extract = getFileObj("icons/extract.png")
    nautilus.icons.apply = getFileObj("icons/apply.png")
    nautilus.icons.basedOn = getFileObj("icons/based-on.png")
    nautilus.icons.remove = getFileObj("icons/remove.png")
    nautilus.icons.settings = getFileObj("icons/settings.png")
  } catch (e) {
    throw new Error("[load] " + e.message)
  }
}