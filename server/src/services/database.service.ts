import mongoose from "mongoose";
import { databaseLogger } from "../config/database.config";

/**
 * Represents a connection to the MongoDB database.
 */
export default class Database {
  private readonly uri: string; // MongoDB connection URI
  private readonly options: mongoose.ConnectOptions; // Options for MongoDB connection

  /**
   * Initializes the database connection settings.
   */
  constructor() {
    this.uri = process.env.MONGODB_URI || "mongodb://localhost:27017/uber_clone";
    this.options = { autoIndex: process.env.NODE_ENV === "development" };
  }

  /**
   * Handles MongoDB disconnection event.
   */
  private handleDisconnect = (): void =>
    databaseLogger.log("MongoDB disconnected");

  /**
   * Handles MongoDB error event.
   * @param error - The error that occurred.
   */
  private handleError = (error: Error): void =>
    databaseLogger.error(`MongoDB error: ${error}`);

  /**
   * Sets up event listeners for MongoDB connection events.
   */
  private setupListeners(): void {
    mongoose.connection.on("disconnected", this.handleDisconnect);
    mongoose.connection.on("error", this.handleError);
  }

  /**
   * Establishes a connection to MongoDB and sets up event listeners.
   * @returns A promise that resolves when the connection is successful.
   */
  public async connect(): Promise<void> {
    try {
      // Connects to MongoDB
      await mongoose.connect(this.uri, this.options);

      // Setup event listeners for MongoDB connection events
      this.setupListeners();

      // Loads user model
      await import("../models/user.model");

      // Logs the success of the connection
      databaseLogger.log("Successfully connected to MongoDB.");
    } catch (error) {
      databaseLogger.error(`Error connecting to MongoDB: ${error}`);
      process.exit(1);
    }
  }
}
