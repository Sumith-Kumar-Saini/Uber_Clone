import { Request, Response } from "express";
import { UserObj } from "../types/user.types";
import { ResponseUtils } from "../utils/response.utils";
import { AuthService } from "../services/auth.service";
import { BlackListTokenModel } from "../models/blackListToken.model";

/**
 * Handles user authentication and registration processes.
 */
export class UserAuthController {
  /**
   * Registers a new user.
   * 
   * @param req - Express request object.
   * @param res - Express response object.
   */
  static async registerUser(req: Request, res: Response): Promise<void> {
    const validationErrors = ResponseUtils.handleValidationErrors(req);
    if (validationErrors) {
      res.status(400).json(validationErrors);
      return;
    }

    try {
      const { fullName, email, password }: UserObj = req.body;
      const user = await AuthService.register({ fullName, email, password });
      // Handle registration result
      if ("error" in user) return ResponseUtils.ErrorHandler(res, user);
      // Set token cookie and respond
      ResponseUtils.setCookieAndRespond(res, { status: 201, data: { success: true, message: "User registered successfully" }, token: user.token });
    } catch (error) {
      ResponseUtils.sendErrorResponse(res, 400, (error as Error));
    }
  }

  /**
   * Authenticates a user.
   * 
   * @param req - Express request object.
   * @param res - Express response object.
   */
  static async loginUser(req: Request, res: Response): Promise<void> {
    const validationErrors = ResponseUtils.handleValidationErrors(req);
    if (validationErrors) {
      res.status(400).json(validationErrors);
      return;
    }

    try {
      const { email, password }: UserObj = req.body;
      const user = await AuthService.login({ email, password });
      // Handle authentication result
      if ("error" in user) return ResponseUtils.ErrorHandler(res, user);
      // Set token cookie and respond
      ResponseUtils.setCookieAndRespond(res, { status: 200, data: { success: true, message: "User logged in successfully" }, token: user.token });
    } catch (error) {
      ResponseUtils.sendErrorResponse(res, 400, (error as Error));
    }
  }

  /**
   * Logs out a user.
   * 
   * @param req - Express request object.
   * @param res - Express response object.
   */
  static async logoutUser(req: Request, res: Response): Promise<void> {
    res.clearCookie("token");
    const token: string = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlackListTokenModel.create({ token });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  }
}
