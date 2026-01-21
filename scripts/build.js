import fs from "fs"
import Logger from "./utils/log.js"
import jsxbin from "jsxbin"

const nautilusJSX = "Nautilus.jsx"
const nautilusJSXBIN = "Nautilus.jsxbin"
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
    log("copied!")

    log("building nautilus to .dist")
    await jsxbin(nautilusJSX, outputFolder + nautilusJSXBIN)

    log("build complete")
  } catch (e) {
    throw new Error("[build] " + e.message)
  }
}

async function main() {
  const logInstance = new Logger(main.name) 

  logInstance.log("script started")
  logInstance.log("calling build function...")

  await build((log) => {
    logInstance.log(log)
  })

  logInstance.log("done!")
}

const logInstance = new Logger("root")

try {
  main()
} catch (e) {
  console.error(logInstance.error(e.message))
}