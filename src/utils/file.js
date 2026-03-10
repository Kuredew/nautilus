export function getFileObj(path) {
  try {
    return new File(path)
  } catch (e) {
    throw new Error("[getFileObj] " + e.message)
  }
}

export function readFile(path) {
  let code
  let fileObj

  try {
    fileObj = getFileObj(path)
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

export function readJsonFile(path) {
  try {
    const code = JSON.parse(readFile(path))
    return code
  } catch {
    return null
  }
}

export function writeFile(path, content) {
    var file = getFileObj(path)

    if (file.open("w")) {
        file.write(content);
        file.close();
    } else {
        alert("Error opening file for writing.");
    }
}