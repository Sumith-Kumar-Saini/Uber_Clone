import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * This class provides methods for generating and verifying JWT tokens.
 */
export class JwtService {
  /**
   * This method returns the secret key for JWT token generation and verification.
   * @returns The secret key for JWT token.
   * @throws Error if the JWT_SECRET environment variable is missing.
   */
  private static get SecretKey(): string {
    const SECRET_KEY = process.env.JWT_SECRET;
    if (!SECRET_KEY) throw new Error("Missing JWT_SECRET environment variable");
    return SECRET_KEY;
  }

  /**
   * This method generates a JWT authentication token.
   * @param payload - The data to encode in the token.
   * @param expiresIn - The expiration time for the token.
   * @returns The signed JWT token.
   */
  public static generateToken(
    payload: object,
    expiresIn: string | number = "1h"
  ): string {
    return jwt.sign(payload, this.SecretKey, { expiresIn });
  }

  /**
   * This method verifies a JWT authentication token.
   * @param token - The JWT token to verify.
   * @returns The decoded JWT token payload if valid, otherwise an error is thrown.
   */
  public static verifyToken(token: string): JwtPayload | string {
    return jwt.verify(token, this.SecretKey);
  }
}
