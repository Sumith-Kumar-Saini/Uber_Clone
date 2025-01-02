import { Request, Response, NextFunction } from "express";
import { Middleware } from "./auth.middleware";
import { ResponseUtils } from "@/utils/response.utils";
import { ValidationChain } from "express-validator";
import { Roles } from "@/types/roles.types";
import { ExpressMiddleware, ExpressResponse } from "@/types/route.types";

class Helper {
  static RoleNotFound(res: Response): void {
    return ResponseUtils.sendErrorResponse(res, 400, "Role not found!");
  }

  static async runMultipleMiddlewares(middlewares: ValidationChain[] | ExpressResponse, req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!Array.isArray(middlewares)) {
        return middlewares(res);
      }
      for (const middleware of middlewares)
        await new Promise<void>((resolve, reject) => {
          middleware(req, res, (err?: any) => (err? reject(err) : resolve()));
        });
      return next();
    } catch (err) {
      return ResponseUtils.ErrorHandler(res, { error: "Unauthorized" });
    }
  }
}
  

export default class AuthMiddleware {
  static verifyRole = (req: Request, res: Response, next: NextFunction): void => {
    const role = req.headers["x-auth-role"] as Roles | undefined;
    if (!role)
      return ResponseUtils.sendErrorResponse(res, 400, "Role is required in the headers");
    if (role !== "user" && role !== "captain")
      return ResponseUtils.sendErrorResponse(res, 400, "Role is invalid; it can only be a user or captain");
    req.role = role;
    return next();
  };

  static register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.role) return Helper.RoleNotFound(res);
    return await Helper.runMultipleMiddlewares(Middleware.register(req.role), req, res, next);
  }

  static login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.role) return Helper.RoleNotFound(res);
    return await Helper.runMultipleMiddlewares(Middleware.login(req.role), req, res, next);
  }

  static logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.role) return Helper.RoleNotFound(res);
    return await Middleware.verify(req.role)(req, res, next);
  }

  static verify = (role: Roles): ExpressMiddleware => {
    return Middleware.verify(role);
  }
}