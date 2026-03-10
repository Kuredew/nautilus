import { nautilus } from "../state";
import { readJsonFile, writeFile } from "./file";
import { getFolderPath } from "./myDocuments";

const jsonName = "settings.json"

function folderPath() {
  try {
    return getFolderPath('Settings')
  } catch (e) {
    throw new Error("[getFolder] " + e.message)
  }
}

function jsonPath() {
  try {
    const settingsFolderPath = folderPath()
    return settingsFolderPath + "/" + jsonName
  } catch (e) {
    throw new Error("[settingsJsonPath] " + e.message)
  }
}

export function load() {
  try {
    const settings = readJsonFile(jsonPath())
    
    if (settings) nautilus.settings = {...nautilus.settings, ...settings}
  } catch (e) {
    throw new Error("[load] " + e.message)
  }
}

export function save() {
  try {
    writeFile(jsonPath(), JSON.stringify(nautilus.settings))
    
  } catch (e) {
    throw new Error("[save] " + e.message)
  }
}