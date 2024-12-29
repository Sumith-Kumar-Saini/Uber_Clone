import { Request, Response, NextFunction } from "express";
import { ResponseUtils } from "@/utils/response.utils";
import { AuthService } from "@/services/auth.service";

export class AuthMiddleware {
  static async verifyUserAuthToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = AuthService.extractToken(req);
      if (!token) return ResponseUtils.ErrorHandler(res, { error: "Unauthorized" });

      const isBlacklisted = await AuthService.isTokenBlacklisted(token);
      if (isBlacklisted) return ResponseUtils.ErrorHandler(res, { error: "Unauthorized" });

      const user = await AuthService.validateAndFetchUser(token);
      if (!user) return ResponseUtils.ErrorHandler(res, { error: "User not found" });

      req.user = user;
      return next();
    } catch (error) {
      return ResponseUtils.ErrorHandler(res, { error: "Unauthorized" });
    }
  }

  static async verifyCaptainAuthToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = AuthService.extractToken(req);
      if (!token) return ResponseUtils.sendErrorResponse(res, 401, "Unauthorized");

      const isBlacklisted = await AuthService.isTokenBlacklisted(token);
      if (isBlacklisted) return ResponseUtils.sendErrorResponse(res, 401, "Unauthorized");

      const captain = await AuthService.validateAndFetchCaptain(token);
      if (!captain) return ResponseUtils.sendErrorResponse(res, 404, "Captain not found");

      req.captain = captain;
      return next();
    } catch (error) {
      return ResponseUtils.sendErrorResponse(res, 401, "Unauthorized");
    }
  }
}