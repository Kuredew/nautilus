import { nautilus } from "../state";

export function replaceVersion(str: string) {
  return str.replace("VERSION", nautilus.version);
}
