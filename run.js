import { fileURLToPath } from 'node:url'
import { loadEnvFile } from 'node:process'
import { dirname, join } from 'node:path'
import { exec } from 'child_process'

// Load .env file
loadEnvFile()

const __dirname = dirname(fileURLToPath(import.meta.url))
const AE_PATH = process.env.AE_PATH

const NautilusJSXPath = join(__dirname, "Nautilus.jsx")

exec(`"${AE_PATH}" -r ${NautilusJSXPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error.message}`)
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`)
    return;
  }
  console.log(`stdout: ${stdout}`)
});
