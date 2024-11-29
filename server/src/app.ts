// Import required packages
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler } from './middleware/error.middleware';
import IndexRoute from './routes/index';
import UserRoute from './routes/user';

// Initialize environment variables
dotenv.config();

// Create Express application instance
const app = express();

// Middleware setup
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', IndexRoute);
app.use('/user', UserRoute);

// Error handling
app.use(errorHandler);

export default app;