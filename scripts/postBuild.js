import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

const outputFolderPath = "dist"
const nautilusJSXFileName = "Nautilus.jsx"
const header = `
/**
  * Please do not modify the code from here; 
  * this file is a build result and it may be difficult to find the function you want to modify.
  *
  * You can clone and build the script from the Nautilus repository:
  * Please visit https://github.com/Kuredew/nautilus
*/


// trigger polyfill
Object = undefined
Array = undefined
String = undefined

`

console.log("Running Post Build Script...")
const fullPath = path.join(outputFolderPath, nautilusJSXFileName)
const data = readFileSync(fullPath)
writeFileSync(fullPath, header + data)
console.log("done!")