import { Request, Response } from 'express';

export class IndexController {
    public static getHome(req: Request, res: Response): void {
        res.status(200).send("The server is working!");
    }
} 