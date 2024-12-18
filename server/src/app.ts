// Import required packages
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "@/middlewares/error.middleware";
import IndexRoute from "@/routes/index.routes";
import AuthRoute from "@/routes/auth.routes";
import Database from "@/services/database.service";
import UserRoute from "@/routes/user.routes";

// Load environment variables
dotenv.config();

// Create Express app instance
const app = express();

// Initialize database connection
const database = new Database();
database.connect();

// Set up middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security headers
app.use(morgan("dev")); // Log requests in dev mode
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Define routes
app.use("/", IndexRoute); // Index route
app.use("/api/auth", AuthRoute); // Auth route
app.use("/api/user", UserRoute); // User route

// Handle errors
app.use(errorHandler);

// Export app instance
export default app;
