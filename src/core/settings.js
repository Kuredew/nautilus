import { nautilus } from "../state";
import { save } from "../utils/settings";
import { resetButton } from "../utils/ui";

export function createSettingsWindow() {
  const windowRef = new Window("dialog", "Settings", undefined, {resizeable: true})

  const settingsPanel = windowRef.add("panel", undefined, "Settings")
  
  const displayProgress = settingsPanel.add("checkbox", undefined, "Display Progress")
  displayProgress.helpTip = "Display a progress bar window while script is executing"
  displayProgress.value = nautilus.settings.displayProgressWindow

  displayProgress.onClick = () => {
    nautilus.settings.displayProgressWindow = displayProgress.value
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