export default class Logger {
  constructor(funcName) {
    this.funcName = funcName
  }

  parse(str) {
    return `[${this.funcName}] ${str}`
  }

  log(logStr) {
    console.log(this.parse(logStr))
  }

  error(errorStr) {
    console.error(this.parse(errorStr))
  }
}