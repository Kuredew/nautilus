import * as esbuild from "esbuild";
import { libFolderPath } from "./utils/pathHelper.js";
import { readFileSync } from "fs";
import { join } from "path";

const filesToBin = [
  {
    key: "about_png",
    path: join(libFolderPath, "icons", "about.png"),
  },
  {
    key: "preset_png",
    path: join(libFolderPath, "icons", "preset.png"),
  },
  {
    key: "apply_png",
    path: join(libFolderPath, "icons", "apply.png"),
  },
  {
    key: "bake_png",
    path: join(libFolderPath, "icons", "bake.png"),
  },
  {
    key: "basedon_png",
    path: join(libFolderPath, "icons", "basedOn.png"),
  },
  {
    key: "comp_png",
    path: join(libFolderPath, "icons", "comp.png"),
  },
  {
    key: "extract_png",
    path: join(libFolderPath, "icons", "extract.png"),
  },
  {
    key: "reload_png",
    path: join(libFolderPath, "icons", "reload.png"),
  },
  {
    key: "remove_png",
    path: join(libFolderPath, "icons", "remove.png"),
  },
  {
    key: "settings_png",
    path: join(libFolderPath, "icons", "settings.png"),
  },
  {
    key: "text_png",
    path: join(libFolderPath, "icons", "text.png"),
  },
  {
    key: "nautilus_ffx",
    path: join(libFolderPath, "effect", "nautilus", "default.ffx"),
  },
  {
    key: "nautiflow_ffx",
    path: join(libFolderPath, "effect", "nautiflow", "default.ffx"),
  },
];

const binString = {};

filesToBin.forEach(({ key, path }) => {
  const fileBuffer = readFileSync(path, "binary");

  binString[`BUILD_ENV.${key}`] = JSON.stringify(fileBuffer);
});

esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "build/bundle.js",
  loader: {
    ".jsx": "text",
    ".txt": "text",
  },
  inject: ["./src/lib/json2.js"],
  define: binString,
});
