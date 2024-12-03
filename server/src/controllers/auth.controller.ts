import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserObj, IUser } from "../types/user.types";
import { ResponseUtils } from "../utils/response.utils";
import { JwtService } from "../services/jwt.service";
import { AuthService } from "../services/auth.service";

/**
 * Handles user authentication and registration processes.
 */
export class AuthController {
  /**
   * Registers a new user by validating input and creating an account.
   * 
   * @param req - Express request object.
   * @param res - Express response object.
   */
  static async registerUser(req: Request, res: Response): Promise<void> {
    // Validate request data and handle any validation errors
    const validationErrors = ResponseUtils.handleValidationErrors(req);
    if (validationErrors) {
      res.status(400).json(validationErrors);
      return;
    }

    try {
      // Extract user data from request body
      const { fullName, email, password } = req.body;
      // Attempt to register the user and generate a token
      const { user, token } = await AuthService.register({ fullName, email, password });
      // Set the authentication token cookie and respond with success
      AuthController.setCookieAndRespond(res, 201, { success: true, message: "User registered successfully", user }, token);
    } catch (error) {
      // Handle any errors that occur during registration
      ResponseUtils.sendErrorResponse(res, error);
    }
  }

  /**
   * Authenticates a user by validating credentials and issuing a token.
   * 
   * @param req - Express request object.
   * @param res - Express response object.
   */
  static async loginUser(req: Request, res: Response): Promise<void> {
    // Validate request data and handle any validation errors
    const validationErrors = ResponseUtils.handleValidationErrors(req);
    if (validationErrors) {
      res.status(400).json(validationErrors);
      return;
    }

    try {
      // Extract user credentials from request body
      const { email, password }: UserObj = req.body;
      // Validate user credentials and retrieve user data
      const user: IUser | { error: string } =
        await UserService.validateUserCredentials(email, password);
      // Check if validation failed
      if ("error" in user) {
        res.status(401).json({ success: false, message: "Invalid credentials", error: user.error });
        return;
      }
      // Generate an authentication token for the user
      const token = JwtService.generateToken(user._id, "14d");
      // Set the authentication token cookie and respond with success
      AuthController.setCookieAndRespond(res, 200, { success: true, message: "User logged in successfully", token }, token);
    } catch (error) {
      // Handle any errors that occur during login
      ResponseUtils.sendErrorResponse(res, error);
    }
  }

  /**
   * Logs out a user by clearing their authentication token.
   * 
   * @param req - Express request object.
   * @param res - Express response object.
   */
  static logoutUser(req: Request, res: Response): void {
    // Clear the authentication token cookie
    res.clearCookie("authToken");
    // Respond with success
    res.status(200).json({ success: true, message: "Logged out successfully" });
  }

  /**
   * Sets the authentication token cookie and sends a response with the provided data.
   * 
   * @param res - Express response object.
   * @param status - HTTP status code.
   * @param data - Data to be included in the response.
   * @param token - Authentication token.
   */
  private static setCookieAndRespond(res: Response, status: number, data: any, token: string): void {
    // Set the authentication token cookie with secure and HTTP-only flags
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 14 * 24 * 60 * 60 * 1000 });
    // Send the response with the provided data
    res.status(status).json(data);
  }
}
