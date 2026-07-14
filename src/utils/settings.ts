import { nautilus } from "../state";
import { readJsonFile, writeFile } from "./file";
import { getFolderByName } from "./myDocuments";
import { getFile as getFileUtil } from "./file";

const settingsJsonName = "settings.json";

const getFileByName = (fileName: string) => {
  const folder = getFolderByName("settings");

  if (folder) {
    const jsonPath = `${folder.fsName}/${fileName}`;
    return getFileUtil(jsonPath);
  }
};

export function load() {
  try {
    const file = getFileByName(settingsJsonName);
    if (!file) throw new Error("File is undefined");

    const settings = readJsonFile(file);

    if (settings) nautilus.settings = { ...nautilus.settings, ...settings };
  } catch (e) {
    throw new Error("[load] " + String(e), { cause: e });
  }
}

export function save() {
  try {
    const file = getFileByName(settingsJsonName);
    if (!file) throw new Error("File is undefined");

    writeFile(file, JSON.stringify(nautilus.settings));
  } catch (e) {
    throw new Error("[save] " + String(e), { cause: e });
  }
}
