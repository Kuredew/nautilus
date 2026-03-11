// import { getFileObj, readFile, readJsonFile } from "./utils/nautilusLib"
import { readFile, readJsonFile } from './utils/file'
import { getFile } from './utils/nautilusLib'
import { load as settingsLoad } from './utils/settings'

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
      bake: null,
      remove: null,
      settings: null
    },
    settings: {
      displayProgressWindow: false
    },
    palette: null
}

export function load() {
  try {
    // Load expression for Comp Mode
    nautilus.firstPresetFileObj = getFile("Nautilus.ffx")
    nautilus.secondPresetFileObj = getFile("Nautilus2.ffx")
    nautilus.version = readJsonFile(getFile("package.json")).version
    nautilus.aboutStr = readFile(getFile("about.txt"))
    nautilus.expression.layer.template = readFile(getFile("layer/template.jsx"))
    nautilus.expression.layer.position = readFile(getFile("layer/position.jsx"))
    nautilus.expression.layer.rotationX = readFile(getFile("layer/rotationX.jsx"))
    nautilus.expression.layer.rotationY = readFile(getFile("layer/rotationY.jsx"))
    nautilus.expression.layer.rotationZ = readFile(getFile("layer/rotationZ.jsx"))
    nautilus.expression.layer.opacity = readFile(getFile("layer/opacity.jsx"))
    nautilus.expression.layer.scale = readFile(getFile("layer/scale.jsx"))

    // Load expression for Text layer mode
    nautilus.nautiFlowPresetFileObj = getFile("NautiFLow.ffx")
    nautilus.expression.text.template = readFile(getFile("text/template.jsx"))
    nautilus.expression.text.trackingMaskValue = readFile(getFile("text/trackingMaskValue.jsx"))
    nautilus.expression.text.trackingMask = readFile(getFile("text/trackingMask.jsx"))
    nautilus.expression.text.position = readFile(getFile("text/position.jsx"))
    nautilus.expression.text.positionValue = readFile(getFile("text/positionValue.jsx"))
    nautilus.expression.text.positionMask = readFile(getFile("text/positionMask.jsx"))
    nautilus.expression.text.positionMaskValue = readFile(getFile("text/positionMaskValue.jsx"))
    nautilus.expression.text.rotation = readFile(getFile("text/rotation.jsx"))
    nautilus.expression.text.rotationValue = readFile(getFile("text/rotationValue.jsx"))
    nautilus.expression.text.rotationMask = readFile(getFile("text/rotationMask.jsx"))
    nautilus.expression.text.rotationMaskValue = readFile(getFile("text/rotationMaskValue.jsx"))
    nautilus.expression.text.scale = readFile(getFile("text/scale.jsx"))
    nautilus.expression.text.scaleValue = readFile(getFile("text/scaleValue.jsx"))
    nautilus.expression.text.scaleMask = readFile(getFile("text/scaleMask.jsx"))
    nautilus.expression.text.scaleMaskValue = readFile(getFile("text/scaleMaskValue.jsx"))
    nautilus.expression.text.opacity = readFile(getFile("text/opacity.jsx"))
    nautilus.expression.text.opacityValue = readFile(getFile("text/opacityValue.jsx"))
    
    // Load button Icon
    nautilus.icons.text = getFile("icons/text.png")
    nautilus.icons.comp = getFile("icons/comp.png")
    nautilus.icons.about = getFile("icons/about.png")
    nautilus.icons.extract = getFile("icons/extract.png")
    nautilus.icons.apply = getFile("icons/apply.png")
    nautilus.icons.basedOn = getFile("icons/based-on.png")
    nautilus.icons.bake = getFile("icons/bake.png")
    nautilus.icons.remove = getFile("icons/remove.png")
    nautilus.icons.settings = getFile("icons/settings.png")

    settingsLoad()
  } catch (e) {
    throw new Error("[load] " + e.message)
  }
}