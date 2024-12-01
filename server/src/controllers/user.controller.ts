import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { validationResult } from "express-validator";
import { UserObj, IUser } from "../types/user.types";
import {
  handleValidationErrors,
  sendErrorResponse,
} from "../utils/response.util";

export class UserController {
  /**
   * Handles fetching all users (placeholder implementation).
   */
  public static getUsers(req: Request, res: Response): void {
    res.send("The server is working!");
  }

  /**
   * Handles user registration.
   * Validates inputs and creates a new user.
   */
  public static async registerUser(req: Request, res: Response): Promise<void> {
    // Handle validation errors
    const validationErrors = handleValidationErrors(req);
    if (validationErrors) {
      res.status(400).json(validationErrors);
      return;
    }

    try {
      const { fullName, email, password }: UserObj = req.body;

      // Create a new user
      const user: IUser = await UserService.createUser({
        fullName,
        email,
        password,
      });

      // Generate authentication token for the user
      const token = UserService.generateAuthToken(user._id);

      // Send success response
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        userInfo: user,
      });
    } catch (error) {
      // Handle unexpected errors
      sendErrorResponse(res, error);
    }
  }

  /**
   * Handles user login
   * Validates inputs and returns an authentication token.
   */
  public static async loginUser(req: Request, res: Response): Promise<void> {
    // Handle validation errors
    const validationErrors = handleValidationErrors(req);
    if (validationErrors) {
      res.status(400).json(validationErrors);
      return;
    }

    try {
      const { email, password }: UserObj = req.body;

      const user: IUser | { error: string } =
        await UserService.validateUserCredentials(email, password);
      if ("error" in user) {
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
          error: user.error,
        });
        return; // Ensure to return after sending the response
      }

      // Generate authentication token for the user
      const token = UserService.generateAuthToken(user._id);

      // Send success response
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
      });
    } catch (error) {
      // Handle unexpected errors
      sendErrorResponse(res, error);
    }
  }
}
