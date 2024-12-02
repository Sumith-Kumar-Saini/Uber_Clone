import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserObj, IUser } from "../types/user.types";
import { ResponseUtils } from "../utils/response.utils";
import { JwtService } from "../services/jwt.service";
import { AuthService } from "../services/auth.service";

export class AuthController {
  /**
   * Handles user registration with input validation and account creation.
   */
  static async registerUser(req: Request, res: Response): Promise<void> {
    // Handle validation errors
    const validationErrors = ResponseUtils.handleValidationErrors(req);
    if (validationErrors) {
      res.status(400).json(validationErrors);
      return;
    }

    try {
      const { fullName, email, password } = req.body;
      const { user, token } = await AuthService.register({ fullName, email, password });
      AuthController.setCookieAndRespond(res, 201, { success: true, message: "User registered successfully", user }, token);
    } catch (error) {
      ResponseUtils.sendErrorResponse(res, error);
    }
  }

  /**
   * Validates user credentials and issues an authentication token.
   */
  static async loginUser(req: Request, res: Response): Promise<void> {
    // Handle validation errors
    const validationErrors = ResponseUtils.handleValidationErrors(req);
    if (validationErrors) {
      res.status(400).json(validationErrors);
      return;
    }

    try {
      const { email, password }: UserObj = req.body;

      const user: IUser | { error: string } =
        await UserService.validateUserCredentials(email, password);
      if ("error" in user) {
        res.status(401).json({ success: false, message: "Invalid credentials", error: user.error });
        return;
      }

      const token = JwtService.generateToken(user._id, "14d");
      AuthController.setCookieAndRespond(res, 200, { success: true, message: "User logged in successfully", token }, token);
    } catch (error) {
      ResponseUtils.sendErrorResponse(res, error);
    }
  }

  /**
   * Handles user login by validating inputs and setting an auth token.
   */
  static logoutUser(req: Request, res: Response): void {
    // Implementation remains the same.
    res.clearCookie("authToken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  }

  /**
   * Sets the authentication token cookie and responds with the provided data.
   * @param res - Express response object
   * @param status - HTTP status code
   * @param data - Data to be included in the response
   * @param token - Authentication token
   */
  private static setCookieAndRespond(res: Response, status: number, data: any, token: string): void {
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 14 * 24 * 60 * 60 * 1000 });
    res.status(status).json(data);
  }
}
