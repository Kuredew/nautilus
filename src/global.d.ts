export {};

type BUILD_ENV = {
  nautilus_ffx: string;
  nautiflow_ffx: string;
  apply_png: string;
  reload_png: string;
  text_png: string;
  comp_png: string;
  about_png: string;
  extract_png: string;
  basedon_png: string;
  bake_png: string;
  remove_png: string;
  settings_png: string;
};

declare global {
  const BUILD_ENV: BUILD_ENV;
  interface Window {
    update(): void;
  }
}
