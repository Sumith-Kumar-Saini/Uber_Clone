import { Request, Response, NextFunction } from "express";
import { ResponseUtils } from "@/utils/response.utils";
import { ValidationChain } from "express-validator";
import { RoleUtils } from "@/utils/role.utils";
import { Roles } from "@/types/roles.types";

export class AuthMiddleware {
  static roleCheck = (req: Request, res: Response, next: NextFunction): void => {
    const role = req.headers["x-auth-role"] as Roles | undefined;
    if (!role) 
      return ResponseUtils.sendErrorResponse(res, 400, "Role is required in the headers");
    if (role !== "user" && role !== "captain") 
      return ResponseUtils.sendErrorResponse(res, 400, "Role is invalid; it can only be a user or captain");
    req.role = role;
    return next();
  };

  static register = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
    if (!req.role) return this.RoleNotFound(res);
    return await this.runMultipleMiddlewares(RoleUtils.middleware.register(req.role), req, res, next);
  };

  static login = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
    if (!req.role) return this.RoleNotFound(res);
    return await this.runMultipleMiddlewares(RoleUtils.middleware.login(req.role), req, res, next);
  };

  static logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
    if (!req.role) return this.RoleNotFound(res);
    return await RoleUtils.middleware.logout(req.role)(req, res, next);
  };

  private static RoleNotFound(res: Response): void {
    return ResponseUtils.sendErrorResponse(res, 400, "Role not found!");
  }

  private static async runMultipleMiddlewares(middlewares: ValidationChain[], req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      for (const middleware of middlewares)
        await new Promise<void>((resolve, reject)=>{middleware(req, res, (err?: any)=>(err ? reject(err) : resolve()))});
      return next();
    } catch (err) {
      return next(err);
    }
  }
}