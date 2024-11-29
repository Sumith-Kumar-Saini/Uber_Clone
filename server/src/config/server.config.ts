import debug from "debug";
import normalizePort from "../utils/normalizePort";

// Define namespace constants
const SERVER_LOG_NAMESPACE = "development:server-log";
const SERVER_ERROR_NAMESPACE = "development:server-error";

// Create debuggers with specific namespaces
export const serverLogger = {
  log: debug(SERVER_LOG_NAMESPACE),
  error: debug(SERVER_ERROR_NAMESPACE),
};

export const PORT = normalizePort(process.env.PORT || "5000");
