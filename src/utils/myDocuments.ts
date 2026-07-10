const userDataPath = Folder.myDocuments;
const folderName = "Nautilus";

export function nautilusFolder() {
  try {
    const folder = new Folder(`${userDataPath.fullName}/${folderName}`);
    if (!folder.exists) {
      folder.create();
    }
    return folder;
  } catch (e) {
    if (e instanceof Error)
      throw new Error("[myDocument/nautilusFolder] " + e.message);
  }
}

export function getFolderByName(folderName: string) {
  try {
    const folder = nautilusFolder();

    if (!folder) throw new Error("Folder is undefined");

    const folderPathObj = new Folder(folder.fsName + "/" + folderName);
    if (!folderPathObj.exists) {
      folderPathObj.create();
    }

    return folderPathObj;
  } catch (e) {
    if (e instanceof Error)
      throw new Error("[myDocument/getFolderPath] " + e.message);
  }
}
