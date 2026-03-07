/**
 * Nautilus Project
 * Created by Kureichi | zeanlost
 */

import './lib/json2.js'
import { load } from './state.js'
import { createMainWindow } from './ui/manifest.js';
import { handleLoadError } from './utils/error.js';

function NautilusScript(ui_ref) {
  load()

  /**
   * Shows the window
   */
  const mainWindow = createMainWindow(ui_ref)
  mainWindow.center()
  mainWindow.show()
}

try {
  NautilusScript(this);
} catch (e) {
  handleLoadError(e.message)
}