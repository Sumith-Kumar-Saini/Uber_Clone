// Import required packages
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/error.middleware";
import IndexRoute from "./routes/index.routes";
import UserRoute from "./routes/user.routes";
import Database from "./services/database.service";

// Initialize environment variables
dotenv.config();

// Create Express application instance
const app = express();

// Initialize and connect to the database
const database = new Database();
database.connect();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", IndexRoute);
app.use("/api/auth", UserRoute);

// Error handling
app.use(errorHandler);

export default app;
