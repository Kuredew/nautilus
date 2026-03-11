import { EXPRESSION_FOLDER } from "../config";
// import { readFile as readFileUtil, readJsonFile as readJsonFileUtil } from "./file";

export function nautilusLibFolder() {
  try {
    // eslint-disable-next-line no-undef
    const folderObj = new Folder((new File($.fileName).parent).fsName + "/" + EXPRESSION_FOLDER);
    return folderObj;
  } catch (e) {
    throw new Error("[nautilusLibFolder] " + e.message)
  }
}

export function getFile(fileName) {
  const folderObj = nautilusLibFolder();

  const fileObj = new File(folderObj.fsName + "/" + fileName)
  if (!fileObj.exists) {
    throw new Error("[nautilusLib/getFileObj] File '" + fileName + "' is not exists in '" + EXPRESSION_FOLDER + "' folder, please install Nautilus correctly!")
  }

  return fileObj
}

// export function getFilePath(fileName) {
//   try {
//     const obj = getFileObj(fileName)
    
//     return obj.fsName
//   } catch (e) {
//     throw new Error("[nautilusLib/getFilePath] " + e.message)
//   }
// }

// export function readFile(fileName) {
//   try {
//     return readFileUtil(getFilePath(fileName))
//   } catch (e) {
//     throw new Error("[nautilusLib/readFile] " + e.message)
//   }
// }

// export function readJsonFile(fileName) {
//   try {
//     return readJsonFileUtil(getFilePath(fileName))
//   } catch (e) {
//     throw new Error("[nautilusLib/readJsonFile] " + e.message)
//   }
// }