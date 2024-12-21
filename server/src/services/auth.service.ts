import { Request } from "express";
import { UserService } from "./user.service";
import { JwtService } from "./jwt.service";
import { UserObj, IUser } from "@/types/user.types";
import { ErrorObject } from "@/types/error.types";
import { ObjectId } from "mongoose";
import { BlackListTokenModel } from "@/models/blackListToken.model";
import { Roles } from "@/types/roles.types";

/**
 * Handles user authentication services.
 */
export class AuthService {
  static extractToken(req: Request): string | null {
    return req.cookies.token || req.headers.authorization?.split(' ')[1] || null;
  }

  static async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await BlackListTokenModel.findOne({ token });
    return !!blacklistedToken;
  }

  static async validateAndFetchUser(token: string): Promise<IUser | null> {
    const decoded = JwtService.verifyToken<{ id: string }>(token);
    if (typeof decoded === 'string') return null; // Invalid token

    return await UserService.findUserById(decoded.id);
  }

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

  /**
    // this is not ready, don't use
    register(req: Request) {
      const handler = this.RegistrationHandler(req.role as Roles);
      return handler(req);
    }
    
    // this is not ready, don't use
    RegistrationHandler(role: Roles) {
      switch (role) {
        case "user": return this.registerUser;
        case "captain": return this.registerCaptain;
        default:
          throw new Error("Invalid Role")
      }
    }
    
    // this is not ready, don't use
    registerUser(req: Request) {
      // Logic specific to user registration
      return {
        statusCode: 201,
        response: {
            message: "User registered successfully.",
            error: null,
        },
      };
    }
    
    // this is not ready, don't use
    registerCaptain(req: Request) {
      // Logic specific to captain registration
      return {
        statusCode: 201,
        response: {
            message: "Captain registered successfully.",
            error: null,
        },
      };
    }
  */
}


