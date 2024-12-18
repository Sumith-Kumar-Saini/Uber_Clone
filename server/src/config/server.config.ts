import debug from "debug"; // Importing the 'debug' module for logging purposes.
import normalizePort from "@/utils/normalizePort"; // Importing the normalizePort utility function.
import { Logger } from "@/types/logger.types"; // Importing the Logger interface for type checking.

/**
 * Defines the namespace constants for the server logger.
 * 
 * @property {string} ENV - The environment variable for the application.
 * @property {string} SERVER_LOG_NAMESPACE - The namespace for server log messages.
 * @property {string} SERVER_ERROR_NAMESPACE - The namespace for server error messages.
 */
const ENV = process.env.NODE_ENV || 'development'; // Setting the environment variable to 'development' if not set.
const SERVER_LOG_NAMESPACE = `${ENV}:server-log`; // Constructing the namespace for server log messages.
const SERVER_ERROR_NAMESPACE = `${ENV}:server-error`; // Constructing the namespace for server error messages.

/**
 * Creates and exports the serverLogger object with specific namespaces for logging and error logging.
 * 
 * @property {Logger} serverLogger - The logger object for server operations.
 */
export const serverLogger: Logger = {
  log: debug(SERVER_LOG_NAMESPACE), // Debugger for general server logging.
  error: debug(SERVER_ERROR_NAMESPACE) // Debugger for server error logging.
};

/**
 * Normalizes and exports the PORT for the server.
 * 
 * @property {number} PORT - The normalized port number for the server.
 */
export const PORT = normalizePort(process.env.PORT || "4000"); // Normalizing the port number from environment variable or defaulting to 5000.
