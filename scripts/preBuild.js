import fs from "fs";
import Logger from "./utils/log.js";
import path, { join } from "path";
import {
  libFolderName,
  libFolderPath,
  outputFolderName,
} from "./utils/pathHelper.js";

const otherFiles = [
  {
    from: "HOW_TO_INSTALL.txt",
    to: "HOW_TO_INSTALL.txt",
  },
  {
    from: "LICENSE.txt",
    to: "LICENSE.txt",
  },
];

const build = async (onLog = () => {}) => {
  const logInstance = new Logger(build.name);

  const log = (log) => {
    onLog(logInstance.parse(log));
  };

  try {
    log("starting build...");

    log(`copying other files`);
    otherFiles.forEach((file) => {
      const finalOutput = path.join(outputFolderName, file.to);

      log(`copying ${file.from} to ${finalOutput}`);
      fs.cpSync(file.from, finalOutput, { recursive: true });
    });
    log("copied!");

    // log(`building ${nautilusJSXPath} to ${sourcePath}`)
    // await jsxbin(nautilusJSXPath, sourcePath)

    log("build complete");
  } catch (e) {
    throw new Error(logInstance.parse(String(e)));
  }
};

async function main(onLog = () => {}) {
  const logInstance = new Logger(main.name);

  try {
    onLog(logInstance.parse("script started"));
    onLog(logInstance.parse("calling build function..."));

    await build((log) => {
      onLog(logInstance.parse(log));
    });

    onLog(logInstance.parse("done!"));
  } catch (e) {
    throw new Error(logInstance.parse(String(e)));
  }
}

const logInstance = new Logger("root");

main((log) => logInstance.log(log)).catch((e) => logInstance.error(String(e)));
