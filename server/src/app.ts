// Import required packages
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from './middleware/error.middleware';
import IndexRoute from './routes/index';
import UserRoute from './routes/user';
import Database from "./services/Database";

// Initialize environment variables
dotenv.config();

// Create Express application instance
const app = express();

// initials database
const database = new Database();

// connects database
database.connect();

// Middleware setup
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', IndexRoute);
app.use('/user', UserRoute);

// Error handling
app.use(errorHandler);

export default app;