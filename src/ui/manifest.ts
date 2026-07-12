import { applyNautilus } from "../core/apply";
import { bake } from "../core/bake";
import { createBasedOnWindow } from "../core/changeBasedOn";
import { extract } from "../core/extract";
import { createAboutWindow } from "../core/help";
import { reload } from "../core/reload";
import { removeNautilus } from "../core/remove";
import { createSettingsWindow } from "../core/settings";
import { nautilus } from "../state";
import { handleIssue } from "../utils/error";
import { resetButton } from "../utils/ui";

function executeFunc(func: () => void) {
  try {
    func();
  } catch (e) {
    if (e instanceof Error)
      handleIssue({
        level: "ERROR",
        message: "[executeFunc] " + e.message,
      });
  }
}

export function createMainWindow(ui_ref: Panel | Window) {
  try {
    const windowRef =
      ui_ref instanceof Panel
        ? ui_ref
        : new Window("palette", "Nautilus", undefined, { resizeable: true });
    windowRef.orientation = "column";
    windowRef.alignChildren = ["fill", "fill"];
    windowRef.margins = 5;

    const btnGroup = windowRef.add("group", undefined) as Group;
    btnGroup.orientation = "row";
    btnGroup.alignChildren = ["fill", "fill"];
    if (btnGroup.preferredSize.width) btnGroup.preferredSize.width + 20;

    const applyButton = btnGroup.add(
      "iconbutton",
      undefined,
      nautilus.icons.apply ?? "",
      { style: "toolbutton" },
    ) as IconButton;
    applyButton.helpTip = "Apply Nautilus";

    const basedOnButton = btnGroup.add(
      "iconbutton",
      undefined,
      nautilus.icons.basedOn ?? "",
      { style: "toolbutton" },
    );
    basedOnButton.helpTip =
      "Change Based On text animator\n(Please note this only works for text layer)";

    const reloadButton = btnGroup.add(
      "iconbutton",
      undefined,
      nautilus.icons.reload ?? "",
      { style: "toolbutton" },
    );
    reloadButton.helpTip =
      "Reload applied nautilus expression. (use this to fix common bug)";

    const bakeButton = btnGroup.add(
      "iconbutton",
      undefined,
      nautilus.icons.bake ?? "",
      { style: "toolbutton" },
    );
    bakeButton.helpTip = "Bake applied Nautilus layer into keyframes";

    const removeButton = btnGroup.add(
      "iconbutton",
      undefined,
      nautilus.icons.remove ?? "",
      { style: "toolbutton" },
    );
    removeButton.helpTip = "Remove Nautilus from Text/Comp/Precomp Layer";

    const extractButton = btnGroup.add(
      "iconbutton",
      undefined,
      nautilus.icons.extract ?? "",
      { style: "toolbutton" },
    );
    extractButton.helpTip = "Extract letter from text layer into PreComp";

    const settingsButton = btnGroup.add(
      "iconbutton",
      undefined,
      nautilus.icons.settings ?? "",
      { style: "toolbutton" },
    );
    settingsButton.helpTip = "Settings";

    const helpButton = btnGroup.add(
      "iconbutton",
      undefined,
      nautilus.icons.about ?? "",
      { style: "toolbutton" },
    );
    helpButton.helpTip = "About Nautilus";

    if (windowRef instanceof Window)
      windowRef.onResizing = windowRef.onResize = function () {
        windowRef.layout.resize();

        if (windowRef.size.width && windowRef.size.width < 200) {
          if (btnGroup.orientation === "column") {
            return;
          }

          btnGroup.orientation = "column";
          windowRef.layout.layout(true);
        } else {
          if (btnGroup.orientation === "row") {
            return;
          }

          btnGroup.orientation = "row";
          windowRef.layout.layout(true);
        }
      };

    applyButton.onClick = function () {
      executeFunc(applyNautilus);
      resetButton(this);
    };
    basedOnButton.onClick = function () {
      executeFunc(createBasedOnWindow);
      resetButton(this);
    };
    settingsButton.onClick = function () {
      executeFunc(createSettingsWindow);
      resetButton(this);
    };

    reloadButton.onClick = function () {
      executeFunc(reload);
      resetButton(this);
    };
    bakeButton.onClick = function () {
      executeFunc(bake);
      resetButton(this);
    };
    removeButton.onClick = function () {
      executeFunc(removeNautilus);
      resetButton(this);
    };
    extractButton.onClick = function () {
      executeFunc(extract);
      resetButton(this);
    };
    helpButton.onClick = function () {
      executeFunc(createAboutWindow);
      resetButton(this);
    };

    return windowRef;
  } catch (e) {
    if (e instanceof Error) throw new Error("[createMainWindow] " + e.message);
  }
}

export function createDialogWindow(title: string) {
  try {
    const windowRef = new Window("dialog", title, undefined, {
      resizeable: true,
    });

    windowRef.alignChildren = ["center", "center"];

    windowRef.onResize = function () {
      windowRef.layout.resize();
    };

    return windowRef;
  } catch (e) {
    if (e instanceof Error)
      throw new Error(`[createDialogWindow] ${e.message}`);
  }
}

export function createDialog(title: string, text: string) {
  try {
    const windowRef = createDialogWindow(title);
    if (!windowRef) throw new Error("Dialog window is not created (undefined)");

    const panel = windowRef.add("panel", undefined, title);

    panel.add("statictext", undefined, text, { multiline: true });

    const button = windowRef.add("button", undefined, "Okay");
    button.alignment = ["center", "top"];
    button.onClick = function () {
      windowRef.close();
    };

    return windowRef;
  } catch (e) {
    if (e instanceof Error) throw new Error("[createDialog] " + e.message);
  }
}

export function createProgressWindow(
  title: string,
  text: string,
  minValue: number,
  maxValue: number,
) {
  try {
    const windowRef = new Window("palette", title, undefined, {
      resizeable: false,
    });
    windowRef.spacing = 10;
    windowRef.margins = 0;
    windowRef.alignChildren = ["center", "center"];

    windowRef.add("statictext", undefined, text);

    const progressBar = windowRef.add(
      "progressbar",
      undefined,
      minValue,
      maxValue,
    );
    windowRef.onResize = function () {
      windowRef.layout.resize();
    };

    return {
      windowRef,
      progressBar,
    };
  } catch (e) {
    if (e instanceof Error)
      throw new Error("[createProgressWindow] " + e.message);
  }
}
