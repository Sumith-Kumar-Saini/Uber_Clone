import bcrypt from "bcrypt";

export class PasswordUtils {
  /**
   * Generates a salt and hashes a plain text password.
   * @param password - The plain text password to be hashed.
   * @returns A promise that resolves to the hashed password.
   */
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compares a plain text password with a hashed password.
   * @param password - The plain text password to compare.
   * @param hashedPassword - The hashed password to compare with.
   * @returns A promise that resolves to a boolean indicating if the passwords match.
   */
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
