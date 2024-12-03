import debug from "debug"; // Importing the 'debug' module for logging purposes.

/**
 * Defines the interface for a Logger.
 * 
 * @property {debug.IDebugger} log - The logger for general logging purposes.
 * @property {debug.IDebugger} error - The logger for error logging purposes.
 */
export interface Logger {
  log: debug.IDebugger,
  error: debug.IDebugger,
};
