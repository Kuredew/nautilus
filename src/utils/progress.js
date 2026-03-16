import { nautilus } from "../state";
import { createProgressWindow } from "../ui/manifest";

export function createProgress(title, description, config) {
  try {
    const progressWindowSettings = nautilus.settings.progressWindow;

    let setMinValue = () => {};
    let setMaxValue = () => {};
    let setProgress = () => {};
    let close = () => {};

    if (progressWindowSettings.displayProgressWindow) {
      const { windowRef, progressBar } = createProgressWindow(
        title,
        description,
        config?.minValue,
        config?.maxValue,
      );
      progressBar.value = 0;
      windowRef.center();
      windowRef.show();

      setMinValue = (value) => {
        progressBar.minValue = value;
        windowRef.update();
      };
      setMaxValue = (value) => {
        progressBar.maxValue = value;
        windowRef.update();
      };
      setProgress = (progress) => {
        progressBar.value = progress;
        windowRef.update();
      };
      close = () => {
        if (progressWindowSettings.autoCloseProgressWindow) {
          windowRef.close();
        }
      };
    }

    return {
      setMinValue,
      setMaxValue,
      setProgress,
      close,
    };
  } catch (e) {
    throw new Error("[createProgress] " + e.message);
  }
}
