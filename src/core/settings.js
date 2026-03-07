import { nautilus } from "../state";
import { resetButton } from "../utils/ui";

export function createSettingsWindow() {
  const windowRef = new Window("dialog", "Settings", undefined, {resizeable: true})

  const settingsPanel = windowRef.add("panel", undefined, "Settings")

  windowRef.center()
  windowRef.show()
}