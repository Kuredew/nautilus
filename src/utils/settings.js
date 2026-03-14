import { nautilus } from "../state";
import { readJsonFile, writeFile } from "./file";
import { getFolderByName } from "./myDocuments";
import { getFile as getFileUtil } from './file'

const settingsJsonName = "settings.json"

const getFileByName = (fileName) => {
  const folder = getFolderByName('settings')
  const jsonPath = `${folder.fsName}/${fileName}`
  return getFileUtil(jsonPath)
}

export function load() {
  try {
    const file = getFileByName(settingsJsonName)
    const settings = readJsonFile(file)
    
    if (settings) nautilus.settings = {...nautilus.settings, ...settings}
  } catch (e) {
    throw new Error("[load] " + e.message)
  }
}

export function save() {
  try {
    const file = getFileByName(settingsJsonName)
    writeFile(file, JSON.stringify(nautilus.settings))
    
  } catch (e) {
    throw new Error("[save] " + e.message)
  }
}