import { nautilus } from "../state";
import { save } from "../utils/settings";
import { resetButton } from "../utils/ui";


export function createSettingsWindow() {
  const nautilusSettings = nautilus.settings.nautilus
  const progressWindowSettings = nautilus.settings.progressWindow

  const windowRef = new Window("dialog", "Settings", undefined, {resizeable: true})

  const settingsPanel = windowRef.add("panel", undefined, "Settings")
  settingsPanel.alignChildren = ['left', 'left']
  
  const nautilusPanel = settingsPanel.add('panel', undefined, "Nautilus Options")
  nautilusPanel.alignChildren = ['left', 'left']

  const keyframeInNautilus = nautilusPanel.add('checkbox', undefined, "Add keyframe in to nautilus effect when first applying")
  keyframeInNautilus.value = nautilusSettings.keyframeIn
  const keyframeOutNautilus = nautilusPanel.add('checkbox', undefined, "Add keyframe out on nautilus effect when next apply")
  keyframeOutNautilus.value = nautilusSettings.keyframeOut
  
  const progressBarPanel = settingsPanel.add("panel", undefined, "Progress Bar Window")
  progressBarPanel.alignChildren = ['left', 'left']

  const displayProgress = progressBarPanel.add("checkbox", undefined, "Display progress bar window.")
  displayProgress.helpTip = "Display a progress bar window while script is executing"
  displayProgress.value = progressWindowSettings.displayProgressWindow

  const autoCloseProgress = progressBarPanel.add("checkbox", undefined, "Auto close progress bar after completed.")
  autoCloseProgress.helpTip = "Auto close progress bar window if completed"
  autoCloseProgress.value = progressWindowSettings.autoCloseProgressWindow
  autoCloseProgress.enabled = displayProgress.value
  

  keyframeInNautilus.onClick = () => {
    nautilusSettings.keyframeIn = keyframeInNautilus.value
    resetButton(this)
  }
  keyframeOutNautilus.onClick = () => {
    nautilusSettings.keyframeOut = keyframeOutNautilus.value
    resetButton(this)
  }

  displayProgress.onClick = () => {
    const value = displayProgress.value
    progressWindowSettings.displayProgressWindow = value
    autoCloseProgress.enabled = value
    resetButton(this)
  }
  
  autoCloseProgress.onClick = () => {
    progressWindowSettings.autoCloseProgressWindow = autoCloseProgress.value
    resetButton(this)
  }

  const saveBtn = windowRef.add("button", undefined, "Save & Close")
  saveBtn.onClick = () => {
    save()
    windowRef.close()
    resetButton(this)
  }


  windowRef.center()
  windowRef.show()
}