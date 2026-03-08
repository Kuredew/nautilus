import { applyNautilus } from "../core/apply";
import { createBasedOnWindow } from "../core/changeBasedOn";
import { extract } from "../core/extract";
import { createAboutWindow } from "../core/help";
import { removeNautilus } from "../core/remove";
import { createSettingsWindow } from "../core/settings";
import { nautilus } from "../state";
import { handleError } from "../utils/error";
import { resetButton } from "../utils/ui";

function executeFunc(func) {
  try {
    func()
  } catch (e) {
    handleError("[executeFunc] " + e.message)
  }
}

export function createMainWindow(ui_ref) {
  try {
      const windowRef = (ui_ref instanceof Panel) ? ui_ref : new Window("palette", "Nautilus", undefined, {resizeable: true});
      windowRef.orientation = "column"; 
      windowRef.alignChildren = ["fill", "fill"];
      windowRef.margins = 5

      const btnGroup = windowRef.add("group", undefined, "ButtonGroup");
      btnGroup.orientation = "row"
      btnGroup.alignChildren = ["fill", "fill"];
      const btnGroupWidth = btnGroup.preferredSize.width + 20

      const applyButton = btnGroup.add("iconbutton", undefined, nautilus.icons.apply, { style: "toolbutton" });
      applyButton.helpTip = "Apply Nautilus"
      const changeModeButton = btnGroup.add("iconbutton", undefined, nautilus.icons.text, { style: "toolbutton" });
      const textModeTip = "Apply Nautilus to Text Layer"
      const compModeTip = "Apply Nautilus to Comp/Precomp Layer"
      changeModeButton.helpTip = textModeTip

      const basedOnButton = btnGroup.add("iconbutton", undefined, nautilus.icons.basedOn, { style: "toolbutton" });
      basedOnButton.helpTip = "Change Based On text animator\n(Please note this only works for text layer)"
      const removeButton = btnGroup.add("iconbutton", undefined, nautilus.icons.remove, { style: "toolbutton" });
      removeButton.helpTip = "Remove Nautilus from Text/Comp/Precomp Layer"

      const extractButton = btnGroup.add("iconbutton", undefined, nautilus.icons.extract, { style: "toolbutton" });
      extractButton.helpTip = "Extract letter from text layer into PreComp"

      const settingsButton = btnGroup.add("iconbutton", undefined, nautilus.icons.settings, { style: "toolbutton" });
      settingsButton.helpTip = "Settings"

      const helpButton = btnGroup.add("iconbutton", undefined, nautilus.icons.about, { style: "toolbutton" });
      helpButton.helpTip = "About Nautilus"

      windowRef.onResizing = windowRef.onResize = function() {
        windowRef.layout.resize();

        if (windowRef.size.width < 200) {
          if (btnGroup.orientation === "column") { return }

          btnGroup.orientation = "column"
          windowRef.layout.layout(true)
        } else {
          if (btnGroup.orientation === "row") { return }

          btnGroup.orientation = "row"
          windowRef.layout.layout(true)
        }

      };

      applyButton.onClick = function () { executeFunc(applyNautilus); resetButton(this)}
      changeModeButton.onClick = function () { 
        let finalMode
        if (nautilus.mode == "text") {
          finalMode = "comp"
          this.helpTip = compModeTip
          basedOnButton.enabled = false
        } else if (nautilus.mode == "comp") {
          finalMode = "text"
          this.helpTip = textModeTip
          basedOnButton.enabled = true
        }

          
        this.image = nautilus.icons[finalMode]
        nautilus.mode = finalMode

        resetButton(this)
      }
      basedOnButton.onClick = function () { executeFunc(createBasedOnWindow); resetButton(this) }
      settingsButton.onClick = function () { executeFunc(createSettingsWindow); resetButton(this) }

      removeButton.onClick = function () { executeFunc(removeNautilus); resetButton(this) }
      extractButton.onClick = function() { executeFunc(extract); resetButton(this) }
      helpButton.onClick = function() { executeFunc(createAboutWindow); resetButton(this) }
      
      return windowRef
    } catch (e) {
      throw new Error("[createMainWindow] " + e.message)
    }   
}

export function createDialog(title, text) {
  try {
    const windowRef = new Window("dialog", title, undefined, {resizeable: true})
    windowRef.spacing = 10
    windowRef.margin = 0
    windowRef.alignChildren = ["left", "left"]

    windowRef.add("statictext", undefined, text, {multiline: true})

    const button = windowRef.add("button", undefined, "Okay")
    button.alignment = ["right", "right"]
    button.onClick = function() { windowRef.close() }

    windowRef.onResize = function() { windowRef.layout.resize() }
    return windowRef
  } catch (e) {
    throw new Error("[createDialog] " + e.message)
  }
}

export function createProgressWindow(title, text, minValue, maxValue) {
  try {
    const windowRef = new Window("palette", title, undefined, {resizeable: false})
    windowRef.spacing = 10
    windowRef.margin = 0
    windowRef.alignChildren = ["center", "center"]
    
    windowRef.add("statictext", undefined, text)
    
    const progressBar = windowRef.add("progressbar", undefined, minValue, maxValue)
    windowRef.onResize = function() { windowRef.layout.resize() }

    return {
      windowRef,
      progressBar
    }
  } catch (e) {
    throw new Error("[createProgressWindow] " + e.message)
  }
}