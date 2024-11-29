import { Request, Response, NextFunction } from 'express';
import { serverLogger } from '../config/server.config';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    serverLogger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
}; 