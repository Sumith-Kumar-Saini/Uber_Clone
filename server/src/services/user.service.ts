import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * Generate a JWT authentication token.
   * @param userId - User ID to encode in the token
   * @returns Signed JWT token
   */
  static generateAuthToken(userId: string): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("Missing JWT_SECRET environment variable");
    return jwt.sign({ _id: userId }, jwtSecret);
  }
}
