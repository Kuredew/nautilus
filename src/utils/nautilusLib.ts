import { EXPRESSION_FOLDER } from "../config";

export function nautilusLibFolder() {
  try {
    const folderObj = new Folder(
      new File($.fileName).parent.fsName + "/" + EXPRESSION_FOLDER,
    );
    return folderObj;
  } catch (e) {
    throw new Error("[nautilusLibFolder] " + String(e), { cause: e });
  }
}

export function getFile(fileName: string) {
  const folderObj = nautilusLibFolder();
  if (!folderObj) throw new Error("Folder object is undefined");

  const fileObj = new File(folderObj.fsName + "/" + fileName);
  if (!fileObj.exists) {
    throw new Error(
      "[nautilusLib/getFileObj] File '" +
        fileName +
        "' is not exists in '" +
        EXPRESSION_FOLDER +
        "' folder, please install Nautilus correctly!",
    );
  }

  return fileObj;
}
