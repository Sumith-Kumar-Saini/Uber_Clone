import { Request, Response } from 'express';

export class UserController {
    public static getUsers(req: Request, res: Response): void {
        res.end("The server is working!");
    }
} 