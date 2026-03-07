import { EXPRESSION_FOLDER } from "../config";

export function getPathToNautilusFolder () {
  const folderObj = new Folder((new File($.fileName).parent).fsName + "/" + EXPRESSION_FOLDER);
  return folderObj;
}

export function getFileObj (fileName) {
  const folderObj = getPathToNautilusFolder();
  const fileObj = new File(folderObj.fsName + "/" + fileName)
  if (!fileObj.exists) {
    throw new Error("[getFileObj] File '" + fileName + "' is not exists in '" + EXPRESSION_FOLDER + "' folder, please install Nautilus correctly!")
  }

  return fileObj
}

export function readFile(fileName) {
  let code
  let fileObj

  try {
    fileObj = getFileObj(fileName)
  } catch (e) {
    throw new Error("[readFile] " + e.message)
  }

  try {
      fileObj.open("r");
      code = fileObj.read();
  } catch (e) {
      throw new Error("[readFile] I couldn't read the file: " + e.message);
  } finally {
      fileObj.close();
  }

  return code;
}

export function readJsonFile(fileName) {
  try {
    const code = JSON.parse(readFile(fileName))
    return code
  } catch (e) {
    throw new Error("[readJsonFile] " + e.message)
  }
}