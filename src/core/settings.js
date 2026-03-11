import { nautilus } from "../state";
import { save } from "../utils/settings";
import { resetButton } from "../utils/ui";


export function createSettingsWindow() {
  const progressWindowSettings = nautilus.settings.progressWindow

  const windowRef = new Window("dialog", "Settings", undefined, {resizeable: true})

  const settingsPanel = windowRef.add("panel", undefined, "Settings")
  
  const progressBarPanel = settingsPanel.add("panel", undefined, "Progress Bar Window")
  const displayProgress = progressBarPanel.add("checkbox", undefined, "Display progress bar window.")
  displayProgress.helpTip = "Display a progress bar window while script is executing"
  displayProgress.value = progressWindowSettings.displayProgressWindow

  const autoCloseProgress = progressBarPanel.add("checkbox", undefined, "Auto close progress bar after completed.")
  autoCloseProgress.helpTip = "Auto close progress bar window if completed"
  autoCloseProgress.value = progressWindowSettings.autoCloseProgressWindow
  autoCloseProgress.enabled = displayProgress.value

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