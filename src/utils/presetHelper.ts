import { PresetType } from "../type";
import { getFile, writeFile } from "./file";
import { getFolderByName } from "./myDocuments";
const getFolder = () => {
  const presetFolder = getFolderByName("presets");
  return presetFolder;
};

const getFileFromPresetFolder = (fileName: string) => {
  try {
    const presetFolder = getFolder();
    const fileObj = getFile(`${presetFolder.fsName}/${fileName}`);

    return fileObj;
  } catch (e) {
    throw new Error(`[getFileFromPresetFolder] ${String(e)}`, { cause: e });
  }
};

export const getPresetList = () => {
  try {
    const presetFolder = getFolder();
    const files = presetFolder.getFiles();

    if (!files) throw new Error("Files is undefined");

    const fileNames: string[] = [];
    files.forEach((file) => {
      fileNames.push(file.name);
    });

    return fileNames;
  } catch (e) {
    throw new Error(`[getPresetList] ${String(e)}`, { cause: e });
  }
};

export const savePreset = (contentString: string, fileName: string) => {
  try {
    const presetFolder = getFolder();
    const fileObj = getFile(`${presetFolder.fsName}/${fileName}.json`);
    writeFile(fileObj, contentString);
  } catch (e) {
    throw new Error(`[savePreset] ${String(e)}`, { cause: e });
  }
};

export const deletePreset = (fileName: string) => {
  try {
    const fileObj = getFileFromPresetFolder(fileName);
    const success = fileObj.remove();
    return success;
  } catch (e) {
    throw new Error(`[deltePreset] ${String(e)}`, { cause: e });
  }
};

export const getPreset = (fileName: string) => {
  try {
    const file = getFileFromPresetFolder(fileName);
    file.open("r");
    const content = file.read();
    file.close();

    return JSON.parse(content) as PresetType;
  } catch (e) {
    throw new Error(`[getPreset] ${String(e)}`, { cause: e });
  }
};
