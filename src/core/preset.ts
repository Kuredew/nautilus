import { createDialogWindow, createWindow } from "../ui/manifest";
import { getAllNautilusEffect } from "../utils/effect";
import { getSelectedLayer } from "../utils/layer";
import { nautilusFXToObject } from "../utils/nautilusEffect";
import { getPresetList } from "../utils/presetHelper";

function add() {
  try {
    const layers = getSelectedLayer();
    const test = "";

    layers.forEach((layer) => {
      const effects = getAllNautilusEffect(layer);

      const propObjects = [];
      effects.forEach((effect) => {
        const propObject = nautilusFXToObject(effect);
        propObjects.push(propObject);
      });

      const windowRef = createDialogWindow("Add Preset");
      windowRef.preferredSize = [300, -1];
      const panel = windowRef.add("panel", undefined, "Name your preset");
      panel.orientation = "row";
      panel.alignment = ["fill", "fill"];
      panel.alignChildren = ["fill", "fill"];
      panel.add("edittext", undefined);
      const jsonText = panel.add("statictext", undefined, ".json");
      jsonText.alignment = ["right", "fill"];

      const buttonGroup = windowRef.add("group");
      buttonGroup.orientation = "row";
      buttonGroup.alignment = ["right", "bottom"];

      const cancelButton = buttonGroup.add("button", undefined, "Cancel");
      const saveButton = buttonGroup.add("button", undefined, "Save preset");

      windowRef.show();
    });
  } catch (e) {
    throw new Error(`[presetAdd] ${String(e)}`);
  }
}

export function preset() {
  try {
    const windowRef = createWindow("Nautilus Preset");

    const presetPanel = windowRef.add("panel", undefined, "Presets");
    presetPanel.alignment = ["fill", "fill"];
    presetPanel.alignChildren = ["fill", "fill"];
    const presetList = presetPanel.add("listbox", undefined, getPresetList());
    const getSelection = () => {
      const presetSelection = presetList.selection as ListItem;
      return presetSelection;
    };

    const buttonGroup = windowRef.add("group");
    buttonGroup.alignment = ["center", "bottom"];
    buttonGroup.orientation = "row";
    buttonGroup.preferredSize = [-1, 10];
    const addButton = buttonGroup.add("button", undefined, "+ Add Preset");
    const applyButton = buttonGroup.add("button", undefined, "Apply Preset");

    buttonGroup.add("button", undefined, "- Delete Preset");

    if (!getSelection()) {
      applyButton.enabled = false;
    }
    presetList.onChange = () => {
      try {
        if (getSelection()) {
          applyButton.enabled = true;
        } else {
          applyButton.enabled = false;
        }
      } catch (e) {
        throw new Error(`[presetChange] ${String(e)}`);
      }
    };
    addButton.onClick = add;

    windowRef.show();
  } catch (e) {
    throw new Error("[preset] " + String(e));
  }
}
