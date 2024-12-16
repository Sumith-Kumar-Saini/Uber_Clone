import { Request, Response, NextFunction } from "express";
import { ResponseUtils } from "../utils/response.utils";
import { AuthService } from "../services/auth.service";

export class AuthMiddleware {
  static async verifyAuthToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = AuthService.extractToken(req);
      if (!token) return ResponseUtils.ErrorHandler(res, { error: "Unauthorized" });

      const isBlacklisted = await AuthService.isTokenBlacklisted(token);
      if (isBlacklisted) return ResponseUtils.ErrorHandler(res, { error: "Unauthorized" });

      const user = await AuthService.validateAndFetchUser(token);
      if (!user) return ResponseUtils.ErrorHandler(res, { error: "User not found" });

      req.user = user;
      next();
    } catch (error) {
      return ResponseUtils.ErrorHandler(res, { error: "Unauthorized" });
    }
  }
}