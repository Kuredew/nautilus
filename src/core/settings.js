import { nautilus } from "../state";
import { resetButton } from "../utils/ui";

export function createSettingsWindow() {
  nautilus.settingsDialog = new Window("dialog", "Settings", undefined, {resizeable: true})

  const deprecatedPanel = nautilus.settingsDialog.add("panel", undefined, "Deprecated")

  const legacyMode = deprecatedPanel.add("checkbox", undefined, "Legacy Mode?");
  legacyMode.value = !nautilus.applyToCompLayers;
  legacyMode.helpTip = "Activate legacy mode"
  legacyMode.onClick = function() { 
    nautilus.applyToCompLayers = !legacyMode.value 
    if (legacyMode.value) {
      alert("This mode is deprecated! \n\nThis checkbox was previously 'Apply to layers in the selected comp,' which enabled Nautilus to apply expressions to all layers within the selected precomp/comp.\n\nBut now that mode is the default for Nautilus, and the previous default Nautilus mode is marked as deprecated and called 'legacy mode.'\n\nThis is due to performance issues, and finding layer indexes can be very difficult in that mode.\n\nIn this mode, most animation functions are broken, and only the mask path feature works (this is beneficial for those who want to use the mask path position feature without animation and don't want to use precomp).")
    }

    resetButton(this)
  }

  nautilus.settingsDialog.center()
  nautilus.settingsDialog.show()
}