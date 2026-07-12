/**
 * Nautilus Project
 * Created by Kureichi | zeanlost
 */

import { load } from "./state.js";
import { createMainWindow } from "./ui/manifest.js";
import { handleIssue } from "./utils/error.js";

function NautilusScript(ui_ref: Window | Panel) {
  load();

  /**
   * Shows the window
   */
  const mainWindow = createMainWindow(ui_ref);

  if (mainWindow instanceof Window) {
    mainWindow.center();
    mainWindow.show();
  } else {
    mainWindow.layout.layout(true);
    mainWindow.layout.resize();
  }
}

try {
  // @ts-ignore
  const uiReference = ui_ref as Window | Panel;

  NautilusScript(uiReference);
} catch (e) {
  if (e instanceof Error)
    handleIssue({
      level: "FATAL",
      message: String(e),
    });
}
