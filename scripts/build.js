import fs from "fs"
import Logger from "./utils/log.js"
import jsxbin from "jsxbin"
import path from "path"

const sourcePath = "src"
const nautilusJSXName = "Nautilus.jsx"
const assetsFolderName = "nautilusAssets"
const outputFolderName = "dist"

const nautilusJSXPath = path.join(sourcePath, nautilusJSXName)
const assetsFolderPath = path.join(sourcePath, assetsFolderName)

const nautilusJSXBINOutputPath = path.join(outputFolderName, `Nautilus.jsxbin`)

const otherFiles = [
  {
    name: assetsFolderName,
    from: assetsFolderPath,
    to: ""
  },
  {
    name: "HOW_TO_INSTALL.txt",
    from: "HOW_TO_INSTALL.txt",
    to: ""
  },
  {
    name: "package.json",
    from: "package.json",
    to: assetsFolderName
  },
  {
    name: "LICENSE.txt",
    from: "LICENSE.txt",
    to: ""
  }
]


const build = async (onLog = () => {}) => {
  const logInstance = new Logger(build.name)

  const log = (log) => {
    onLog(logInstance.parse(log))
  }

  try {
    log("starting build...")

    log(`copying other files`)
    otherFiles.forEach(file => {
      const finalOutput = path.join(outputFolderName, file.to, file.name)

      log(`copying ${file.from} to ${finalOutput}`)
      fs.cpSync(file.from, finalOutput, { recursive: true })
    })

    log("copied!")

    log(`building ${nautilusJSXPath} to ${sourcePath}`)
    await jsxbin(nautilusJSXPath, sourcePath)

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