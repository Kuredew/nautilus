import { createDialogWindow } from "../ui/manifest";
import { getAllNautiFlowEffect, getAllNautilusEffect } from "../utils/effect";
import { handleIssue } from "../utils/error";
import { getSelectedLayer } from "../utils/layer";
import { findAnimatorIndexesByEffectName } from "../utils/textLayer";
import { resetButton } from "../utils/ui";

export function changeBasedOn(basedOnIndex: number) {
  app.beginUndoGroup("changeBasedOn");

  try {
    const selectedLayers = getSelectedLayer();

    selectedLayers.forEach((layer) => {
      const selectedEffect = layer.selectedProperties;

      let effectNames: string[] = [];
      if (selectedEffect.length > 0) {
        selectedEffect.forEach((effect) => {
          effectNames.push(effect.name);
        });
      } else {
        const ntlsFXNames = getAllNautilusEffect(layer);
        const ntflFXNames = getAllNautiFlowEffect(layer);

        effectNames = [
          ...(ntlsFXNames ? ntlsFXNames.map((e) => e.name) : []),
          ...(ntflFXNames ? ntflFXNames.map((e) => e.name) : []),
        ];
      }
      if (effectNames.length <= 0) {
        handleIssue({
          level: "WARNING",
          message: `We didn't find any Nautilus or Nautiflow effects in this layer (${layer.name}); this layer was skipped`,
        });

        return;
      }

      const animatorsGroup = layer
        .property("ADBE Text Properties")
        .property("ADBE Text Animators");
      effectNames.forEach((name) => {
        const animatorIndexes = findAnimatorIndexesByEffectName(layer, name);
        if (!animatorIndexes) {
          handleIssue({
            level: "WARNING",
            message: `An error occurred while changing the “based on” parameter of the effect (${name}); this effect was skipped`,
          });
          return;
        }

        animatorIndexes.forEach((index) => {
          const animator = animatorsGroup.property(index);
          const selectorGroup = animator.property("ADBE Text Selectors");
          const selectorExpression = selectorGroup.property(
            "ADBE Text Expressible Selector",
          );
          const selectorExpressionBasedOn = selectorExpression.property(
            1,
          ) as Property;

          selectorExpressionBasedOn.setValue(basedOnIndex);
        });
      });
    });
  } catch (e) {
    if (e instanceof Error) throw new Error("[changeBasedOn] " + e.message);
  }
  app.endUndoGroup();
}

export function createBasedOnWindow(this: any) {
  const windowRef = createDialogWindow("Change Based On");
  if (!windowRef) throw new Error("Dialog window is not created (undefined)");
  windowRef.alignChildren = ["fill", "center"];

  const executeBasedOn = function (basedOnIndex: number) {
    try {
      changeBasedOn(basedOnIndex);
      windowRef.close();
    } catch (e) {
      if (e instanceof Error)
        handleIssue({
          level: "ERROR",
          message: "[executeBasedOn] " + e.message,
        });
    }
  };

  const characterButton = windowRef.add("button", undefined, "Character");
  characterButton.onClick = function () {
    executeBasedOn(1);
  };

  const characterSpacelessButton = windowRef.add(
    "button",
    undefined,
    "Character Spaceless",
  );
  characterSpacelessButton.onClick = function () {
    executeBasedOn(2);
  };

  const wordsButton = windowRef.add("button", undefined, "Words");
  wordsButton.onClick = function () {
    executeBasedOn(3);
  };

  const linesButton = windowRef.add("button", undefined, "Lines");
  linesButton.onClick = function () {
    executeBasedOn(4);
  };

  windowRef.add(
    "statictext",
    undefined,
    "Dont forget to select Nautilus/NautiFlow effect first.",
  );

  windowRef.center();
  windowRef.show();

  resetButton(this);
}
