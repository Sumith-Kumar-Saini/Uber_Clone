import { UserService } from "./user.service";
import { JwtService } from "./jwt.service";
import { UserObj, IUser } from "../types/user.types";
import { ErrorObject } from "../types/error.types";
import { ObjectId } from "mongoose";

/**
 * Handles user authentication services.
 */
export class AuthService {
  /**
   * Registers a new user and returns user info with an authentication token.
   * @param userData - User data for registration.
   * @returns User info and authentication token, or error if registration fails.
   */
  static async register(userData: UserObj): Promise<{ user: IUser; token: string } | ErrorObject> {
    const user = await UserService.createUser(userData);
    if ("error" in user) return user; // Return error if user creation fails
    const token = this.generateToken(user._id);
    return { user, token };
  }

  /**
   * Authenticates a user and returns user info with an authentication token.
   * @param userData - User data for authentication.
   * @returns User info and authentication token, or error if authentication fails.
   */
  static async login(userData: UserObj): Promise<{ user: IUser; token: string } | ErrorObject> {
    const user = await UserService.validateUserCredentials(userData);
    if ("error" in user) return user; // Return error if validation fails
    const token = this.generateToken(user._id);
    return { user, token };
  }

  /**
   * Generates a JWT token for the user.
   * @param userId - User ID for token generation.
   * @returns JWT token.
   */
  private static generateToken(userId: ObjectId): string {
    return JwtService.generateToken({ id: userId }, "24h");
  }
}
