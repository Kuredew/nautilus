import { nautilus } from "../state";
import { createDialog } from "../ui/manifest";

type SeverityType = {
  WARNING: "WARNING";
  ERROR: "ERROR";
  FATAL: "FATAL";
};

export const Severity: SeverityType = {
  WARNING: "WARNING",
  ERROR: "ERROR",
  FATAL: "FATAL",
};

export function displayError(msg: string) {
  if (!nautilus.settings.runtime.displayFullErrorMessage) {
    const findActualError = msg.match(/\[.+\] (.+)/);

    if (findActualError && findActualError[1]) {
      const actualErrorMessage = findActualError[1];
      const windowRef = createDialog(
        "Nautilus Runtime Error",
        actualErrorMessage,
      );

      windowRef?.show();
      return;
    }
  }

  const windowRef = createDialog(
    "Nautilus Runtime Error",
    "The core function was forced to stop due to an unexpected error.\n\nDetail:\n" +
      msg +
      "\n\nif the problem persists, please open a github issue.",
  );

  windowRef?.show();
}

export function displayWarning(msg: string) {
  const windowRef = createDialog("Nautilus Warning", msg);

  windowRef?.show();
}

function displayFatal(msg: string) {
  const windowRef = createDialog(
    "Nautilus Fatal Error",
    "Nautilus was forced to close due to an unexpected error.\n\nDetail:\n" +
      msg +
      "\n\nMake sure you install nautilus correctly, if the problem persists, please open a github issue.",
  );

  windowRef?.show();
}

export function handleIssue(options: {
  level: keyof SeverityType;
  message: string;
}) {
  if (options.level == "ERROR") displayError(options.message);
  else if (options.level == "FATAL") displayFatal(options.message);
  else if (options.level == "WARNING") displayWarning(options.message);
}
