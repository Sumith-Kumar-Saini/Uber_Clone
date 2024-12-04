import { Request, Response } from "express";
import { ResponseUtils } from "../utils/response.utils";

export class UserController {
  static profile(req: Request, res: Response): void {
    try {
      if (!req.user) return ResponseUtils.ErrorHandler(res, { error: "User not authenticated" });
  
      res.status(200).json({ succuss: true, user: req.user });
    } catch (error) {
      return ResponseUtils.ErrorHandler(res, { error: "Something went wrong" });
    }
  }
}