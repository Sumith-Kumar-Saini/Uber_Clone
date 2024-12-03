// Import required packages for the application
import dotenv from "dotenv"; // For environment variable configuration
import express from "express"; // Express framework for building the application
import cors from "cors"; // For enabling CORS
import helmet from "helmet"; // For security headers
import morgan from "morgan"; // For logging
import cookieParser from "cookie-parser"; // For parsing cookies
import { errorHandler } from "./middleware/error.middleware"; // Custom error handling middleware
import IndexRoute from "./routes/index.routes"; // Route for the index
import AuthRoute from "./routes/auth.routes"; // Route for user authentication
import Database from "./services/database.service"; // Service for database operations

// Initialize environment variables from the .env file
dotenv.config();

// Create a new instance of the Express application
const app = express();

// Initialize and connect to the database using the Database service
const database = new Database();
database.connect();

// Middleware setup for the application
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Use helmet for security headers
app.use(morgan("dev")); // Use morgan for logging in development mode
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Define routes for the application
app.use("/", IndexRoute); // Route for the index
app.use("/api/auth", AuthRoute); // Route for user authentication

// Use the custom error handling middleware
app.use(errorHandler);

// Export the Express application instance
export default app;
