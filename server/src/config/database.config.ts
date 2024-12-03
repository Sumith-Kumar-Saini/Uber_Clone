import debug from "debug"; // Importing the 'debug' module for logging purposes.
import { Logger } from "../types/logger.types"; // Importing the Logger interface for type checking.

/**
 * Defines the namespace constants for the database logger.
 * 
 * @property {string} ENV - The environment variable for the application.
 * @property {string} DB_LOG_NAMESPACE - The namespace for database log messages.
 * @property {string} DB_ERROR_NAMESPACE - The namespace for database error messages.
 */
const ENV = process.env.NODE_ENV || 'development';
const DB_LOG_NAMESPACE = `${ENV}:database-log`;
const DB_ERROR_NAMESPACE = `${ENV}:database-error`;

/**
 * Creates and exports the databaseLogger object with specific namespaces for logging and error logging.
 * 
 * @property {Logger} databaseLogger - The logger object for database operations.
 */
export const databaseLogger: Logger = {
    log: debug(DB_LOG_NAMESPACE), // Debugger for general database logging.
    error: debug(DB_ERROR_NAMESPACE) // Debugger for database error logging.
}