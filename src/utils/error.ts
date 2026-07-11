import { nautilus } from "../state";
import { createDialog } from "../ui/manifest";

export function handleError(msg: string) {
  if (!nautilus.settings.runtime.displayFullErrorMessage) {
    const findActualError = msg.match(/\[.+\] (.+)/);

    if (!findActualError) {
      alert(
        "Nautilus is error, but we can found the actual error message, please report this to github repository issue",
      );
      return;
    }

    const actualErrorMessage = findActualError[1];
    const windowRef = createDialog(
      "Nautilus Runtime Error",
      actualErrorMessage,
    );

    windowRef?.show();

    return;
  }

  const windowRef = createDialog(
    "Nautilus Runtime Error",
    "One function of Nautilus gives an Error.\n\nDetail:\n" +
      msg +
      "\n\nYou can open an issue at\nhttps://github.com/Kuredew/nautilus\nif the problem persist.",
  );

  windowRef?.show();
}

export function handleLoadError(msg: string) {
  const windowRef = createDialog(
    "Nautilus Load Error",
    "There was a problem loading Nautilus into After Effects.\n\nDetail:\n" +
      msg +
      "\n\nOpen an issue at\nhttps://github.com/Kuredew/nautilus\nif the problem persist.",
  );

  windowRef?.show();
}
