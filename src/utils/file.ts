import { getFolderByName } from "./myDocuments";

export function getFile(path: string) {
  try {
    return new File(path);
  } catch (e) {
    throw new Error("[getFileObj] " + String(e), { cause: e });
  }
}

export function readFile(file: File) {
  let code;

  try {
    file.open("r");
    code = file.read();
  } catch (e) {
    throw new Error("[readFile] I couldn't read the file: " + String(e), {
      cause: e,
    });
  } finally {
    file.close();
  }

  return code;
}

export function readJsonFile(file: File) {
  try {
    const string = readFile(file);

    let code = {};
    if (string) {
      code = JSON.parse(string) as Record<string, unknown>;
    }

    return code;
  } catch (e) {
    throw new Error("[readJsonFile]" + String(e), { cause: e });
  }
}

export function writeFile(file: File, content: string) {
  if (file.open("w")) {
    file.write(content);
    file.close();
  } else {
    alert("Error opening file for writing.");
  }
}

export function binaryStringToFileObj(binaryString: string, fileName: string) {
  try {
    const folderObj = getFolderByName("effect");
    const filePath = `${folderObj.fsName}/${fileName}`;

    const fileObj = getFile(filePath);
    fileObj.encoding = "BINARY";

    writeFile(fileObj, binaryString);

    return getFile(filePath);
  } catch (e) {
    throw new Error(`[binaryStringToFileObj] ${String(e)}`, { cause: e });
  }
}
