export function getFile(path) {
  try {
    return new File(path)
  } catch (e) {
    throw new Error("[getFileObj] " + e.message)
  }
}

export function readFile(file) {
  let code

  try {
      file.open("r");
      code = file.read();
  } catch (e) {
      throw new Error("[readFile] I couldn't read the file: " + e.message);
  } finally {
      file.close();
  }

  return code;
}

export function readJsonFile(file) {
  try {
    const code = JSON.parse(readFile(file))
    return code
  } catch {
    return null
  }
}

export function writeFile(file, content) {
    if (file.open("w")) {
        file.write(content);
        file.close();
    } else {
        alert("Error opening file for writing.");
    }
}