import { handleIssue } from "./error";

export function executeFunc<Args extends unknown[], Return>(
  func: (...args: Args) => Return,
  args: Args,
) {
  try {
    return func(...args);
  } catch (e) {
    handleIssue({
      level: "ERROR",
      message: "[executeFunc] " + String(e),
    });
  }
}
