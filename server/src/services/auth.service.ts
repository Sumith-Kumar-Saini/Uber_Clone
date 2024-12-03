import { UserService } from "./user.service"; // Importing UserService for user creation
import { JwtService } from "./jwt.service"; // Importing JwtService for token generation
import { UserObj, IUser } from "../types/user.types"; // Importing UserObj and IUser types

/**
 * AuthService is a static class that handles user authentication services.
 */
export class AuthService {
  /**
   * Registers a new user and returns the user information along with an authentication token.
   * This method creates a new user using the UserService and generates an authentication token using the JwtService.
   * 
   * @param userData - The user data for registration, including full name, email, password, and socket ID.
   * @returns A promise that resolves to an object containing the registered user information and an authentication token.
   */
  static async register(userData: UserObj): Promise<{ user: IUser; token: string }> {
    // Creating a new user using the UserService
    const user = await UserService.createUser(userData);
    // Generating an authentication token for the user using the JwtService
    const token = JwtService.generateToken(user._id);
    // Returning the registered user information and the authentication token
    return { user, token };
  }
}
