import { nautilus } from "../state";

export function replaceVersion(str) {
  return str.replace("VERSION", nautilus.version)
}