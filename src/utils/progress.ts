import { nautilus } from "../state";
import { createProgressWindow } from "../ui/manifest";

export function createProgress(
  title: string,
  description: string,
  config: {
    minValue: number;
    maxValue: number;
  },
) {
  try {
    const progressWindowSettings = nautilus.settings.progressWindow;

    let setMinValue = (value: number) => {};
    let setMaxValue = (value: number) => {};
    let setProgress = (progress: number) => {};
    let close = () => {};

    if (progressWindowSettings.displayProgressWindow) {
      const progressWindow = createProgressWindow(
        title,
        description,
        config?.minValue,
        config?.maxValue,
      );

      if (!progressWindow) throw new Error("Progress window is undefined");

      progressWindow.progressBar.value = 0;
      progressWindow.windowRef.center();
      progressWindow.windowRef.show();

      setMinValue = (value) => {
        progressWindow.progressBar.minvalue = value;
        progressWindow.windowRef.update();
      };
      setMaxValue = (value) => {
        progressWindow.progressBar.maxvalue = value;
        progressWindow.windowRef.update();
      };
      setProgress = (progress) => {
        progressWindow.progressBar.value = progress;
        progressWindow.windowRef.update();
      };
      close = () => {
        if (progressWindowSettings.autoCloseProgressWindow) {
          progressWindow.windowRef.close();
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
    throw new Error("[createProgress] " + String(e));
  }
}
