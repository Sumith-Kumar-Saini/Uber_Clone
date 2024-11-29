import http from "node:http";
import { Application } from "express";
import { PORT, serverLogger } from "../config/server.config";

export default class Server {
  private server: http.Server;

  constructor(app: Application) {
    this.server = http.createServer(app);
  }

  private handleError = (err: Error): void => {
    serverLogger.error(`Server error: ${err}`);
    process.exit(1);
  };

  private handleListening = (): void => {
    if (process.env.DEBUG === 'development:*') console.clear();
    serverLogger.log(`Server is running on PORT: ${PORT}`);
  };

  public start(): void {
    this.server.listen(PORT);
    this.server.on("error", this.handleError);
    this.server.on("listening", this.handleListening);
  }
} 