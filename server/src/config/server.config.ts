import debug from "debug";
import normalizePort from "../utils/normalizePort";
import { Logger } from "../types/logger.types";

// Define namespace constants
const ENV = process.env.NODE_ENV || 'development';
const SERVER_LOG_NAMESPACE = `${ENV}:server-log`;
const SERVER_ERROR_NAMESPACE = `${ENV}:server-error`;

// Create debuggers with specific namespaces
export const serverLogger: Logger = {
  log: debug(SERVER_LOG_NAMESPACE),
  error: debug(SERVER_ERROR_NAMESPACE),
};

export const PORT = normalizePort(process.env.PORT || "5000");
