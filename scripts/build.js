import fs from "fs"
import Logger from "./utils/log.js"
import jsxbin from "jsxbin"

const nautilusJSXName = "Nautilus.jsx"
const assetsFolderName = "nautilusAssets"

const outputFolder = "dist/"
const nautilusJSXBINOutput = `${outputFolder}/Nautilus.jsxbin`

const otherFiles = [
  {
    from: assetsFolderName,
    to: ""
  },
  {
    from: "HOW_TO_INSTALL.txt",
    to: ""
  },
  {
    from: "package.json",
    to: assetsFolderName
  },
  {
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
      const finalOutput = `${outputFolder}${file.to ? `/${file.to}` : ''}/${file.from}`

      log(`copying ${file.from} to ${finalOutput}`)
      fs.cpSync(file.from, finalOutput, { recursive: true })
    })

    log("copied!")

    log(`building nautilus to ${nautilusJSXBINOutput}`)
    await jsxbin(nautilusJSXName, nautilusJSXBINOutput)

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