import fs from "fs"
import Logger from "./utils/log.js"
import jsxbin from "jsxbin"

const nautilusJSX = "Nautilus.jsx"
const nautilusJSXBIN = "Nautilus.jsxbin"
const otherFiles = ["HOW_TO_INSTALL.txt"]
const assetsFolder = "nautilusAssets/"
const outputFolder = ".dist/"

const build = async (onLog = () => {}) => {
  const logInstance = new Logger(build.name)

  const log = (log) => {
    onLog(logInstance.parse(log))
  }

  try {
    log("starting build...")

    log("copying assets to .dist")
    fs.cpSync(assetsFolder, outputFolder + assetsFolder, { recursive: true })

    log("copying other files to .dist")
    otherFiles.forEach(file => fs.cpSync(file, outputFolder + file))

    log("copied!")

    log("building nautilus to .dist")
    await jsxbin(nautilusJSX, outputFolder + nautilusJSXBIN)

    log("build complete")
  } catch (e) {
    throw new Error(logInstance.parse(e.message))
  }
}

async function main(onLog = () => {}) {
  const logInstance = new Logger(main.name) 

  try {
    onLog(logInstance.parse("script started"))
    onLog(logInstance.parse("calling build function..."))

    await build((log) => {
      onLog(logInstance.parse(log))
    })

    onLog(logInstance.parse("done!"))
  } catch (e) {
    throw new Error(logInstance.parse(e.message))
  }
}

const logInstance = new Logger("root")


main((log) => logInstance.log(log)).catch((e) => logInstance.error(e.message))