import mongoose from "mongoose";
import { databaseLogger } from "../config/database.config";

export default class Database {
  private readonly uri: string;
  private readonly options: mongoose.ConnectOptions;

  constructor() {
    this.uri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/uber_clone";
    this.options = { autoIndex: process.env.NODE_ENV === "development" };
  }

  private handleDisconnect = (): void =>
    databaseLogger.log("MongoDB disconnected");

  private handleError = (error: Error): void =>
    databaseLogger.error(`MongoDB error: ${error}`);

  private setupListeners(): void {
    mongoose.connection.on("disconnected", this.handleDisconnect);
    mongoose.connection.on("error", this.handleError);
  }

  public async connect(): Promise<void> {
    try {
      // Connects to MongoDB
      await mongoose.connect(this.uri, this.options);

      // Setup event listeners (like disconnect, error)
      this.setupListeners();

      // Load models
      await import("../models/user.model");

      // Logs the success
      databaseLogger.log("Successfully connected to MongoDB.");
    } catch (error) {
      databaseLogger.error(`Error connecting to MongoDB: ${error}`);
      process.exit(1);
    }
  }
}
