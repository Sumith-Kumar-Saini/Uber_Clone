import debug from "debug";
import { Logger } from "../types/logger.types";

// Define namespace constants
const ENV = process.env.NODE_ENV || 'development';
const DB_LOG_NAMESPACE = `${ENV}:database-log`;
const DB_ERROR_NAMESPACE = `${ENV}:database-error`;

// Create debuggers with specific namespaces
export const databaseLogger: Logger = {
    log: debug(DB_LOG_NAMESPACE),
    error: debug(DB_ERROR_NAMESPACE)
}