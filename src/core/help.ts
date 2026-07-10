import { nautilus } from "../state";
import { createDialog } from "../ui/manifest";
import { replaceVersion } from "../utils/string";

export function createAboutWindow() {
  try {
    const windowRef = createDialog("About", replaceVersion(nautilus.aboutStr));

    if (!windowRef) throw new Error("Window is not created (undefined)");
    windowRef.center();
    windowRef.show();
  } catch (e) {
    if (e instanceof Error) throw new Error("[help] " + e.message);
  }
}
