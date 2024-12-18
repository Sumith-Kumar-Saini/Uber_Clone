import { Request, Response, NextFunction } from "express";
import { ResponseUtils } from "@/utils/response.utils";
import { Roles } from "@/types/roles.types";
import { log } from "node:console";

const roleCheckMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const role = req.headers["x-auth-role"] as Roles | undefined;
  if (!role)
    return ResponseUtils.sendErrorResponse(res, 400, "Role is required in the header");
  req.role = role;
  return next();
};

export function roleCheck() {
  return roleCheckMiddleware;
}

export class RoleHandle {
  role?: Roles;
  checkMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const role = req.headers["x-auth-role"] as Roles | undefined;
    if (!role) {
      return ResponseUtils.sendErrorResponse(res, 400, "Role is required in the header");
    }
    req.role = role;
    this.role = role;
    log(role);
    return next();
  }
}