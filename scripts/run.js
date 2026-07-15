import { exec } from "child_process";
import { log } from "console";
import { readFileSync } from "fs";
import path from "path";
import process from "process";

process.loadEnvFile();
const afterFXPath = process.env.AFTER_FX_EXE_PATH;
const nautilusJSXPath = path.resolve(path.join("dist", "Nautilus.jsx"));

(function () {
  const cmdArgs = `"${afterFXPath}" -ro ${nautilusJSXPath.replaceAll(`\\`, "/")}`;
  log(`Argument: ${cmdArgs}`);

  exec(cmdArgs, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Shell Error: ${stderr}`);
      return;
    }
    console.log(`Output:\n${stdout}`);
  });
})();
