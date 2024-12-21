import http from "node:http";
import { Application } from "express";
import { PORT, serverLogger } from "@/config/server.config";

/**
 * Represents the server instance.
 */
export default class Server {
  private server: http.Server;

  /**
   * Initializes the server with the Express application.
   * @param app - The Express application.
   */
  constructor(app: Application) {
    this.server = http.createServer(app);
  }

  /**
   * Handles server errors by logging the error and exiting the process.
   * @param err - The error that occurred.
   */
  private handleError = (err: Error): void => {
    serverLogger.error(`Server error: ${err}`);
    process.exit(1);
  };

  /**
   * Handles the server listening event by logging the server status.
   */
  private handleListening = (): void => {
    if (process.env.NODE_ENV === "development") console.clear();
    serverLogger.log(`Server is running on PORT: ${PORT}`);
  };

  /**
   * Starts the server and sets up event listeners for errors and listening.
   */
  public start(): void {
    this.server.listen(PORT);
    this.server.on("error", this.handleError);
    this.server.on("listening", this.handleListening);
  }
}
