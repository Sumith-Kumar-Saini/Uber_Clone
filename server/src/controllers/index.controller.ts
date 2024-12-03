import { Request, Response } from 'express'; // Importing Express request and response types

/**
 * IndexController handles the root route of the application.
 */
export class IndexController {
    /**
     * Handles the GET request for the root route.
     * 
     * @param req - Express request object.
     * @param res - Express response object.
     */
    public static getHome(req: Request, res: Response): void {
        // Sending a success response with a message indicating the server is working
        res.status(200).send("The server is working!");
    }
};