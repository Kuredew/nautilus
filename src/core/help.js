import { nautilus } from "../state"
import { createDialog } from "../ui/manifest"
import { replaceVersion } from "../utils/string"

export function createAboutWindow() {
  try {
    const windowRef = createDialog("About", replaceVersion(nautilus.aboutStr))
    windowRef.center()
    windowRef.show()
  } catch (e) {
    throw new Error("[help] " + e.message)
  }
}