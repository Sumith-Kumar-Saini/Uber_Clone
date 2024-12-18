import { UserModel } from "@/models/user.model";
import { ErrorObject } from "@/types/error.types";
import { IUser, UserObj } from "@/types/user.types";
import { PasswordUtils } from "@/utils/password.utils";
import { errorMessages } from "@/constants/statusMessages.constant";
import { ObjectId } from "mongoose";

export class UserService {
  /**
   * Creates a new user in the database.
   * @param {UserObj} userObj - User object containing fullName, email, and password.
   * @returns {(Promise<IUser>)} The created user document.
   * @throws {Error} If required fields are missing or if user creation fails.
   */
  static async createUser(userObj: UserObj): Promise<IUser | ErrorObject> {
    const missingRequiredFields = this.validateRequiredFields(userObj);
    if (missingRequiredFields) return { error: missingRequiredFields };
    const userExistence = await this.checkUserExistence(userObj.email);
    if (userExistence) return { error: userExistence };
    const hashedPassword = await this.hashPassword(userObj.password);
    const user = await this.createUserInDB(userObj, hashedPassword);
    return this.excludePasswordFromUser(user);
  }

  /**
   * Validates user credentials.
   * @param {string} email - User's email address.
   * @param {string} password - Plain text password.
   * @returns {(Promise<IUser | ErrorObject>)}
   */
  static async validateUserCredentials(userObj: UserObj): Promise<IUser | ErrorObject> {
    const missingRequiredFields = this.validateRequiredFields(userObj);
    if (missingRequiredFields) return { error: missingRequiredFields, message: "Missing required fields" };
    const user = await this.findUserByEmail(userObj.email);
    if (!user) return { error: "User not found", message: "Invalid credentials" };
    const isPasswordValid = await this.comparePassword(userObj.password, user.password);
    if (!isPasswordValid) return { error: "Invalid password", message: "Invalid credentials" };
    return this.excludePasswordFromUser(user);
  }

  static async findUserById(id: ObjectId): Promise<IUser | null> {
    return await UserModel.findById(id);
  }
  
  /**
   * Finds a user by their email address.
   * @param {string} email - The email address to search for.
   * @returns {(Promise<IUser | null>)} The user document if found, otherwise null.
   */
  private static async findUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email }).select("+password");
  }

  /**
   * Validates the required fields for user creation.
   * @param {UserObj} userObj - User object containing email, password, and fullName.
   * @throws {Error} If email, password, or firstName is missing.
   */
  private static validateRequiredFields({ email, password, fullName }: UserObj): null | string {
    if (!email || !password) return errorMessages.MISSING_REQUIRED_FIELDS;
    if (fullName && !fullName.firstName) return "Missing required field: firstname is mandatory";
    return null;
  }

  /**
   * Checks if a user with the given email already exists in the database.
   * @param {string} email - The email address to check.
   * @throws {Error} If a user with the given email already exists.
   */
  private static async checkUserExistence(email: string): Promise<null | string> {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return "Email address already exists";
    return null;
  }

  /**
   * Hashes the given password for secure storage.
   * @param {string} password - The plain text password to hash.
   * @returns {(Promise<string>)} The hashed password.
   */
  private static async hashPassword(password: string): Promise<string> {
    return await PasswordUtils.hashPassword(password);
  }

  /**
   * Creates a new user in the database with the given user object and hashed password.
   * @param {UserObj} userObj - The user object to create.
   * @param {string} hashedPassword - The hashed password for the user.
   * @returns {(Promise<IUser>)} The created user document.
   */
  private static async createUserInDB(userObj: UserObj, hashedPassword: string): Promise<IUser> {
    const user = await UserModel.create({ ...userObj, password: hashedPassword });
    return user;
  }

  /**
   * Excludes the password from the user document for security reasons.
   * @param {IUser} user - The user document to exclude password from.
   * @returns {IUser} The user document without password.
   */
  private static excludePasswordFromUser(user: IUser): IUser {
    const { password: _, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  /**
   * Compares a plain text password with a hashed password.
   * @param {string} password - The plain text password to compare.
   * @param {string} hashedPassword - The hashed password to compare with.
   * @returns {(Promise<boolean>)} True if the passwords match, otherwise false.
   */
  private static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await PasswordUtils.comparePassword(password, hashedPassword);
  }
}
