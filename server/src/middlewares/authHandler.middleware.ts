import { Request, Response, NextFunction } from "express";
import { AuthMiddleware } from "./auth.middleware";
import { AuthValidator } from "@/validators/auth.validator";
import { Roles } from "@/types/roles.types";
import { ResponseUtils } from "@/utils/response.utils";
import { ValidationChain } from "express-validator";
import { ExpressMiddleware } from "@/types/route.types";

export class AuthHandlerMiddleware {
  private static _role: Roles;
  static get role(): Roles { return this._role };
  static set role(value: Roles) { this._role = value };

  static roleCheck(req: Request, res: Response, next: NextFunction): void {
    const role = req.headers["x-auth-role"] as Roles | undefined;
    if (!role) return ResponseUtils.sendErrorResponse(res, 400, "Role is required in the header");
    if (role!== "user" && role!== "captain") return ResponseUtils.sendErrorResponse(res, 400, "Role only can be user or captain");
    req.role = req.role = role;
    next();
  }

  static get register(): ValidationChain[] {
    if (this.role === "user") return AuthValidator.validateUserRegistration;
    if (this.role === "captain") return AuthValidator.validateCaptainRegistration;
    return [];
  }

  static get login(): ValidationChain[] {
    if (this.role === "user") return AuthValidator.validateUserLogin;
    if (this.role === "captain") return AuthValidator.validateCaptainLogin;
    return [];
  }

  static get logout(): ExpressMiddleware {
    if (this.role === "user") return AuthMiddleware.verifyUserAuthToken;
    if (this.role === "captain") return AuthMiddleware.verifyCaptainAuthToken;
    return () => {};
  }  
}