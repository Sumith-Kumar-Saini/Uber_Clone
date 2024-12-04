import { Request, Response, NextFunction } from "express";
import { ResponseUtils } from "../utils/response.utils";
import { UserModel } from "../models/user.model";
import { JwtService } from "../services/jwt.service";
import { IUser } from "../types/user.types";

/**
 * The class is not good to run, it should have same updates.
 */
export class AuthMiddleware {
  static async authenticatedUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token: string = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return ResponseUtils.ErrorHandler(res, { error: "Unauthorized" });

    try {
      const decoded = JwtService.verifyToken<{ id: string }>(token);
      if (typeof decoded === 'string') return ResponseUtils.ErrorHandler(res, { error:'Invalid token' });
      const user: IUser = await UserModel.findById(decoded.id).select("-password");
      if (!user) throw new Error('User not found');
      req.user = user;
      next();
      return;
    } catch (error) {
      return ResponseUtils.ErrorHandler(res, { error: "Unauthorized" });
    }
  }
}