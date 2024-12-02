import { UserService } from "./user.service";
import { JwtService } from "./jwt.service";
import { UserObj, IUser } from "../types/user.types";

export class AuthService {
  /**
   * Registers a new user and returns the user information along with an authentication token.
   * @param userData - The user data for registration.
   * @returns The registered user information and an authentication token.
   */
  static async register( userData: UserObj ): Promise<{ user: IUser; token: string }> {
    const user = await UserService.createUser(userData);
    const token = JwtService.generateToken(user._id);
    return { user, token };
  }
}
