import { nautilus } from "../state"
import { createProgressWindow } from "../ui/manifest"

export function createProgress(maxValue) {
  let setProgress = () => {}
  let close = () => {}

  if (nautilus.settings.displayProgressWindow) {
    const { windowRef, progressBar } = createProgressWindow("Nautilus Extract", "Extracting teks into shapes...", 0, maxValue)
    progressBar.value = 0
    windowRef.center()
    windowRef.show()
    
    setProgress = (progress) => {
      progressBar.value = progress
      windowRef.update()
    }
    close = () => {
      windowRef.close()
    }
  }
  
  return {
    setProgress,
    close
  }
}