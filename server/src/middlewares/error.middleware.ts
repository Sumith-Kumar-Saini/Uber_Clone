import { Request, Response, NextFunction } from 'express'; // Importing Express request, response, and next function types
import { serverLogger } from '@/config/server.config'; // Importing serverLogger for error logging

/**
 * Handles errors that occur within the application by logging the error and sending a generic error response.
 * 
 * @param err - The error object that occurred.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    // Logging the error message using the serverLogger
    serverLogger.error(err.message);
    // Sending a generic error response with a 500 status code
    res.status(500).json({ error: 'Internal Server Error' });
};