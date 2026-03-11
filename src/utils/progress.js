import { nautilus } from "../state"
import { createProgressWindow } from "../ui/manifest"


export function createProgress(title, description, config) {
  const progressWindowSettings = nautilus.settings.progressWindow

  let setProgress = () => {}
  let close = () => {}

  if (progressWindowSettings.displayProgressWindow) {
    const { windowRef, progressBar } = createProgressWindow(title, description, config.minValue, config.maxValue)
    progressBar.value = 0
    windowRef.center()
    windowRef.show()
    
    setProgress = (progress) => {
      progressBar.value = progress
      windowRef.update()
    }
    close = () => {
      if (progressWindowSettings.autoCloseProgressWindow) {
        windowRef.close()
      }
    }
  }
  
  return {
    setProgress,
    close
  }
}