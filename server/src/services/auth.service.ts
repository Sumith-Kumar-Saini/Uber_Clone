import { Request, Response } from "express";
import { UserService } from "./user.service";
import { JwtService } from "./jwt.service";
import { UserObj, IUser } from "@/types/user.types";
import { ErrorObject } from "@/types/error.types";
import { ObjectId } from "mongoose";
import { BlackListTokenModel } from "@/models/blackListToken.model";
import { Roles } from "@/types/roles.types";
import { ResponseUtils } from "@/utils/response.utils";
import { CaptainLoginObj, CaptainRegisterObj, ICaptain } from "@/types/captain.types";
import { CaptainModel } from "@/models/captain.model";
import { PasswordUtils } from "@/utils/password.utils";

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

  static async validateAndFetchCaptain(token: string): Promise<ICaptain | null> {
    const decoded = JwtService.verifyToken<{id: string}>(token);
    if (typeof decoded === "string") return null; // Invalid token

    return await AuthCaptainService.findCaptainById(decoded.id); // rewrite this code and make it clean.
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
}


/**
 * temporary types
 */
type Data = {
  success: boolean;
  error?: boolean;
  message: string;
  data?: any;
  stack?: string;
}

type ResponseResult = {
  statusCode: number;
  data: Data
}

/**
 * temporary captain class
 */
export class AuthCaptainService {
  static register = async (req: Request, res: Response): Promise<ResponseResult> => {
    const validationErrors = ResponseUtils.handleValidationErrors(req);
    if (validationErrors) return this.responseResult(400, validationErrors);
    
    try {
      const { fullName, email, password, vehicle }: CaptainRegisterObj = req.body;
      const captain = await this.createCaptain({ fullName, email, password, vehicle });
      if ("message" in captain) return this.responseResult(400, { success: false, message: captain.message});
      const token = this.generateToken(captain._id);
      this.setCookie(res, token);
      return this.responseResult(201, { success: true, message: "Captain registered successfully", data: { token } });
    } catch (error) {
      return this.responseResult(400, { success: false, message: (error as Error).message });
    }
  }

  static login = async (req: Request, res: Response): Promise<ResponseResult> => {
    const validationErrors = ResponseUtils.handleValidationErrors(req);
    if (validationErrors) return this.responseResult(400, validationErrors);

    try {
      const { email, password }: CaptainLoginObj = req.body;
      const captain = await this.findCaptainByEmail(email);
      if (!captain) return this.responseResult(404, { success: false, message: "Invalid credentials" });
      const isPasswordValid = await PasswordUtils.comparePassword(password, captain.password);
      if (!isPasswordValid) return this.responseResult(404, { success: false, message: "Invalid credentials" });
      const token = this.generateToken(captain._id);
      this.setCookie(res, token);
      return this.responseResult(200, { success: true, message: "Captain logged in successfully" });
    } catch(error) {
      return this.responseResult(400, { success: false, message: (error as Error).message });
    }
  }

  static logout = async (req: Request, res: Response): Promise<ResponseResult> => {
    const token: string = req.cookies.token || req.headers.authorization?.split(' ')[1];
    res.clearCookie("token");
    await BlackListTokenModel.create({ token });
    return this.responseResult(200, { success: true, message: "Logged out successfully" });
  }

  private static findCaptainByEmail = async (email: string): Promise<ICaptain | null> => {
    return await CaptainModel.findOne({ email }).select("+password");
  }

  private static responseResult = (statusCode: number, data: Data ): ResponseResult => {
    return { statusCode, data };
  }

  private static generateToken = (captainId: ObjectId): string => {
    return JwtService.generateToken({ id: captainId}, "24h");
  }

  private static setCookie = (res: Response, token: string): void => {
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 });
  }

  private static createCaptain = async (captainObj: CaptainRegisterObj): Promise<ICaptain | Error> => {
    if (!captainObj) return new Error("fields not provided");
    const captainExistence = await this.checkCaptainExistence(captainObj.email);
    if (captainExistence) return new Error(captainExistence);
    const hashedPassword = await this.hashPassword(captainObj.password);
    const captain = await this.createCaptainInDB(captainObj, hashedPassword);
    return this.excludePasswordFromCaptain(captain);
  }

  private static excludePasswordFromCaptain = (captain: ICaptain): ICaptain => {
    const { password: _, ...captainWithoutPassword } = captain.toObject();
    return captainWithoutPassword;
  }

  private static createCaptainInDB = async (captainObj: CaptainRegisterObj, hashedPassword: string) => {
    return await CaptainModel.create({ ...captainObj, password: hashedPassword });    
  }

  private static checkCaptainExistence = async (email: string) => {
    const existingCaptain = await CaptainModel.findOne({ email });
    if (existingCaptain) return "Email address already exists";
    return null;
  }

  private static hashPassword = async (password: string): Promise<string> => {
    return await PasswordUtils.hashPassword(password);
  }

  static findCaptainById = async (id: ObjectId): Promise<ICaptain | null> => {
    return await CaptainModel.findById(id);
  }
}