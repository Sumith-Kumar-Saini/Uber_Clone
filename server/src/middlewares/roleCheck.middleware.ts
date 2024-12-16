import { Request, Response, NextFunction } from "express";
import { ResponseUtils } from "../utils/response.utils";

const roleCheckMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const role = (req.headers["x-auth-role"] as string) || undefined;
  if (!role)
    return ResponseUtils.sendErrorResponse(res, 400, "Role is required in the header");
  res.role = role;
  return next();
};

export function roleCheck() {
  return roleCheckMiddleware;
}
