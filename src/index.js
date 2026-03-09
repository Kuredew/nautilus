/**
 * Nautilus Project
 * Created by Kureichi | zeanlost
 */

import { load } from './state.js'
import { createMainWindow } from './ui/manifest.js';
import { handleLoadError } from './utils/error.js';

function NautilusScript(ui_ref) {
  load()

  /**
   * Shows the window
   */
  const mainWindow = createMainWindow(ui_ref)
  if (mainWindow instanceof Window) {
    mainWindow.center()
    mainWindow.show()
  } else {
    mainWindow.layout.layout(true)
    mainWindow.layout.resize()
  }
}

try {
  // eslint-disable-next-line no-undef
  NautilusScript(ui_ref);
} catch (e) {
  handleLoadError(e.message)
}