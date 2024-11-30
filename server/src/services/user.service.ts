import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { IUser, UserObj } from "../types/user.types";
import { ObjectId } from "mongoose";

export class UserService {
  /**
   * Hash a plain text password.
   * @param password - Plain text password
   * @returns Hashed password
   */
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Compare a plain text password with a hashed password.
   * @param password - Plain text password
   * @param hashedPassword - Hashed password
   * @returns Boolean indicating if they match
   */
  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * Generate a JWT authentication token.
   * @param userId - User ID to encode in the token
   * @returns Signed JWT token
   */
  static generateAuthToken(userId: ObjectId): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("Missing JWT_SECRET environment variable");
    return jwt.sign({ _id: userId }, jwtSecret);
  }

  /**
   * Create a new user in the database.
   * @param fullName - Full name object containing firstName and lastName.
   * @param email - User's email address.
   * @param password - Plain text password.
   * @returns The created user document.
   * @throws Error if required fields are missing or if user creation fails.
   */
  static async createUser({
    fullName,
    email,
    password,
  }: UserObj): Promise<IUser> {
    // Validate required fields
    if (!fullName?.firstName || !email || !password) {
      throw new Error(
        "Missing required fields: firstname, email, and password are mandatory."
      );
    }

    // Checks the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error("Email address already exists.");

    try {
      // Hash the password before saving the user
      const hashedPassword = await this.hashPassword(password);
      
      // Create the user object
      const userObject = { fullName, email, password: hashedPassword };

      // Save the user to the database
      const user = await UserModel.create(userObject);
      
      return user;
    } catch (error: unknown) {
      // Handle database errors gracefully
      throw new Error(`Error creating user: ${(error as Error).message}`);
    }
  }
}
