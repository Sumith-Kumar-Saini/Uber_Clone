import bcrypt from "bcrypt"; // Importing bcrypt for password hashing and comparison.

/**
 * Represents utility methods for password hashing and comparison.
 */
export class PasswordUtils {
  /**
   * Generates a salt and hashes a plain text password using bcrypt.
   * This method is designed to securely store passwords by generating a salt and then hashing the password.
   * 
   * @param password - The plain text password to be hashed.
   * @returns A promise that resolves to the hashed password.
   */
  static async hashPassword(password: string): Promise<string> {
    // Generating a salt with a cost factor of 10 for password hashing.
    const salt = await bcrypt.genSalt(10);
    // Hashing the password with the generated salt.
    return bcrypt.hash(password, salt);
  }

  /**
   * Compares a plain text password with a hashed password using bcrypt.
   * This method is designed to verify if a plain text password matches a hashed password.
   * 
   * @param password - The plain text password to compare.
   * @param hashedPassword - The hashed password to compare with.
   * @returns A promise that resolves to a boolean indicating if the passwords match.
   */
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    // Comparing the plain text password with the hashed password.
    return bcrypt.compare(password, hashedPassword);
  }
}
