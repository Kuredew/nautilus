export function getFile(path: string) {
  try {
    return new File(path);
  } catch (e) {
    if (e instanceof Error) throw new Error("[getFileObj] " + e.message);
  }
}

export function readFile(file: File) {
  let code;

  try {
    file.open("r");
    code = file.read();
  } catch (e) {
    if (e instanceof Error)
      throw new Error("[readFile] I couldn't read the file: " + e.message);
  } finally {
    file.close();
  }

  return code;
}

export function readJsonFile(file: File) {
  try {
    const string = readFile(file);
    if (!string) throw new Error("File content is undefined.");

    const code = JSON.parse(string) as Record<string, any>;
    return code;
  } catch (e) {
    if (e instanceof Error) throw new Error("[readJsonFile]" + e.message);
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
