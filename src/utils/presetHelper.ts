import { getFolderByName } from "./myDocuments";

export const getPresetList = () => {
  try {
    const presetFolder = getFolderByName("presets");
    const files = presetFolder.getFiles();

    if (!files) throw new Error("Files is undefined");

    const fileNames: string[] = [];
    files.forEach((file) => {
      fileNames.push(file.name);
    });

    return fileNames;
  } catch (e) {
    throw new Error(`[getPresetList] ${String(e)}`);
  }
};
