import jwt, { JwtPayload } from "jsonwebtoken";

export class JwtService {
  private static get SecretKey(): string {
    const SECRET_KEY = process.env.JWT_SECRET;
    if (!SECRET_KEY) throw new Error("Missing JWT_SECRET environment variable");
    return SECRET_KEY;
  }

  /**
   * Generate a JWT authentication token.
   * @param payload - any data to encode in the token
   * @param expiresIn - expires timing
   * @returns Signed JWT token
   */
  public static generateToken(
    payload: object,
    expiresIn: string | number = "1h"
  ): string {
    return jwt.sign(payload, this.SecretKey, { expiresIn });
  }

  /**
   * Verify a JWT authentication token.
   * @param token - JWT token to verify
   * @returns Decoded JWT token payload if valid, otherwise an error is thrown
   */
  public static verifyToken(token: string): JwtPayload | string {
    return jwt.verify(token, this.SecretKey);
  }
}
