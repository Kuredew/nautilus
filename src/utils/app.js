export function getCompItem() {
  const comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) {
    throw new Error("[getCompItem] Please select Composition!");
  }

  return comp
}

export const copy = () => app.executeCommand(19)
export const paste = () => app.executeCommand(20)