import { EffectProp, PresetType } from "../type";
import { alertDialog, createDialogWindow, createWindow } from "../ui/manifest";
import {
  applyNautiFLowEffect,
  applyNautilusEffect,
  FXToProps,
  getAllNautiFlowEffect,
  getAllNautilusEffect,
} from "../utils/effect";
import { handleIssue } from "../utils/error";
import { executeFunc } from "../utils/execute";
import { getSelectedLayer, isCompLayer, isTextLayer } from "../utils/layer";
import { applyTextLayer as nautiflowApplyTextLayer } from "../utils/nautiflowExpr";
import {
  applyTextLayer as nautilusApplyTextLayer,
  applyLayers as nautilusApplyLayers,
} from "../utils/nautilusExpr";
import {
  deletePreset,
  getPreset,
  getPresetList,
  savePreset,
} from "../utils/presetHelper";

function add(finishCallback: () => void) {
  try {
    const layers = getSelectedLayer();

    layers.forEach((layer) => {
      try {
        const nautilusEffects = getAllNautilusEffect(layer);
        const nautiflowEffects = getAllNautiFlowEffect(layer);

        if (nautilusEffects.length <= 0 && nautiflowEffects.length <= 0) {
          throw new Error(
            "This is not a layer that has been applied by Nautilus",
          );
        }

        const propObjects: EffectProp[] = [];
        nautiflowEffects.forEach((effect) => {
          const propObject = FXToProps(effect);
          propObjects.push({
            effectName: "nautiflow",
            props: propObject,
          });
        });
        nautilusEffects.forEach((effect) => {
          const propObject = FXToProps(effect);
          propObjects.push({
            effectName: "nautilus",
            props: propObject,
          });
        });

        const windowRef = createDialogWindow("Add Preset");
        windowRef.preferredSize = [300, -1];

        const panel = windowRef.add(
          "panel",
          undefined,
          `Name your preset from "${layer.name}"`,
        );
        panel.orientation = "row";
        panel.alignment = ["fill", "fill"];
        panel.alignChildren = ["fill", "fill"];

        const inputText = panel.add("edittext", undefined);

        const jsonText = panel.add("statictext", undefined, ".json");
        jsonText.alignment = ["right", "fill"];

        const buttonGroup = windowRef.add("group");
        buttonGroup.orientation = "row";
        buttonGroup.alignment = ["right", "bottom"];

        buttonGroup.add("button", undefined, "Cancel");

        const saveButton = buttonGroup.add("button", undefined, "Save preset");
        saveButton.onClick = () => {
          if (inputText.text) {
            const presetObject: PresetType = {
              presets: propObjects,
            };
            savePreset(JSON.stringify(presetObject, null, 4), inputText.text);
            windowRef.close();
            finishCallback();
          }
        };

        windowRef.show();
      } catch (e) {
        handleIssue({
          level: "WARNING",
          message: `The layer named “${layer.name}” is skipped: ${String(e)}`,
        });
      }
    });
  } catch (e) {
    throw new Error(`[presetAdd] ${String(e)}`, { cause: e });
  }
}

function removePreset(itemName: string, successCallback: () => void) {
  try {
    const success = deletePreset(itemName);

    if (success) {
      successCallback();
    }
  } catch (e) {
    throw new Error(`[deletePreset] ${String(e)}`, {
      cause: e,
    });
  }
}

export function applyPreset(itemName: string, successCallback: () => void) {
  try {
    const selectedLayers = getSelectedLayer();
    const presetObj = getPreset(itemName);
    const presets = presetObj.presets;

    selectedLayers.forEach((layer) => {
      try {
        presets.forEach((preset) => {
          try {
            switch (preset.effectName) {
              case "nautilus": {
                const nautilusFX = applyNautilusEffect(layer, preset.props);

                if (isCompLayer(layer)) {
                  nautilusApplyLayers(layer, [nautilusFX.name]);
                } else if (isTextLayer(layer)) {
                  nautilusApplyTextLayer(layer, nautilusFX.name);
                }
                break;
              }
              case "nautiflow": {
                applyNautiFLowEffect(layer, preset.props);
                nautiflowApplyTextLayer(layer);
                break;
              }
            }
          } catch (e) {
            handleIssue({
              level: "WARNING",
              message: `The preset was skipped because we were unable to apply it to Nautilus/Nautiflow. ${String(e)}`,
            });
          }
        });
      } catch (e) {
        handleIssue({
          level: "WARNING",
          message: `The layer named “${layer.name}” was skipped because we were unable to apply the Nautilus preset to it. ${String(e)}`,
        });
      }
    });
    successCallback();
  } catch (e) {
    throw new Error(`[applyPreset] ${String(e)}`, { cause: e });
  }
}

export function preset() {
  try {
    const windowRef = createWindow("Nautilus Preset");
    windowRef.preferredSize = [300, 300];

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

    const deleteButton = buttonGroup.add(
      "button",
      undefined,
      "- Delete Preset",
    );

    if (!getSelection()) {
      applyButton.enabled = false;
      deleteButton.enabled = false;
    }
    presetList.onChange = () => {
      try {
        if (getSelection()) {
          applyButton.enabled = true;
          deleteButton.enabled = true;
        } else {
          applyButton.enabled = false;
          deleteButton.enabled = false;
        }
      } catch (e) {
        throw new Error(`[presetChange] ${String(e)}`, { cause: e });
      }
    };

    const updateItems = () => {
      presetList.removeAll();
      const newPresetList = getPresetList();
      newPresetList.forEach((presetName) => {
        presetList.add("item", presetName);
      });
    };

    deleteButton.onClick = () => {
      const selection = getSelection();

      alertDialog(
        `Are you sure to delete this preset file (${selection.text})?\nyour preset file will gone FOREVER!`,
        () => {
          executeFunc(removePreset, [
            selection.text,
            () => {
              updateItems();
            },
          ]);
        },
      );
    };
    applyButton.onClick = () => {
      const selection = getSelection();
      executeFunc(applyPreset, [selection.text, () => {}]);
    };
    addButton.onClick = () => {
      executeFunc(add, [updateItems]);
    };

    windowRef.show();
  } catch (e) {
    throw new Error("[preset] " + String(e), { cause: e });
  }
}
