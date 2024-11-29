import debug from "debug";

export interface Logger {
  log: debug.IDebugger,
  error: debug.IDebugger,
};
