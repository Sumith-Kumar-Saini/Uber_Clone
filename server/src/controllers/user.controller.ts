import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { validationResult } from "express-validator";
import { UserObj, IUser } from "../types/user.types";
import { handleValidationErrors, sendErrorResponse } from "../utils/response.util";

export class UserController {
  /**
   * Handles fetching all users (placeholder implementation).
   */
  public static getUsers(req: Request, res: Response): void {
    res.send("The server is working!");
  }

  /**
   * Handles user registration.
   * Validates input and creates a new user.
   */
  public static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      // Handle validation errors
      const validationErrors = handleValidationErrors(req);
      if (validationErrors) {
        res.status(400).json(validationErrors);
        return;
      }

      const { fullName, email, password }: UserObj = req.body;

      // Create a new user
      const user: IUser = await UserService.createUser({ fullName, email, password });

      // Generate authentication token for the user
      const token = UserService.generateAuthToken(user._id);

      // Send success response
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
      });
    } catch (error) {
      // Handle unexpected errors
      sendErrorResponse(res, error);
    }
  }
}
