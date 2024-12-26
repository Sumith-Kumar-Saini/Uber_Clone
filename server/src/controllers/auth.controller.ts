import { Request, Response } from "express";
import { UserObj } from "@/types/user.types";
import { ResponseUtils } from "@/utils/response.utils";
import { AuthCaptainService, AuthService } from "@/services/auth.service";
import { BlackListTokenModel } from "@/models/blackListToken.model";


class AuthUser {
  static async register(req: Request, res: Response): Promise<void> {
    const validationErrors = ResponseUtils.handleValidationErrors(req);
    if (validationErrors) {
      res.status(400).json(validationErrors);
      return;
    }

    try {
      const { fullName, email, password }: UserObj = req.body;
      const user = await AuthService.register({ fullName, email, password });
      // Handle registration result
      if ("error" in user) return ResponseUtils.ErrorHandler(res, user);
      // Set token cookie and respond
      ResponseUtils.setCookieAndRespond(res, { status: 201, data: { success: true, message: "User registered successfully" }, token: user.token });
    } catch (error) {
      ResponseUtils.sendErrorResponse(res, 400, (error as Error));
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    const validationErrors = ResponseUtils.handleValidationErrors(req);
    if (validationErrors) {
      res.status(400).json(validationErrors);
      return;
    }

    try {
      const { email, password }: UserObj = req.body;
      const user = await AuthService.login({ email, password });
      // Handle authentication result
      if ("error" in user) return ResponseUtils.ErrorHandler(res, user);
      // Set token cookie and respond
      ResponseUtils.setCookieAndRespond(res, { status: 200, data: { success: true, message: "User logged in successfully" }, token: user.token });
    } catch (error) {
      ResponseUtils.sendErrorResponse(res, 400, (error as Error));
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    const token: string = req.cookies.token || req.headers.authorization?.split(' ')[1];
    res.clearCookie("token");
    await BlackListTokenModel.create({ token });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  }
}

class AuthCaptain {
  static register = async (req: Request, res: Response): Promise<void> => {
    const response = await AuthCaptainService.register(req, res);
    res.status(response.statusCode).json(response.data);
  }

  static login = async (req: Request, res: Response): Promise<void> => {
    const response = await AuthCaptainService.login(req, res);
    res.status(response.statusCode).json(response.data);
  }
  
  static logout = async (req: Request, res: Response): Promise<void> => {
    const response = await AuthCaptainService.logout(req, res);
    res.status(response.statusCode).json(response.data);
  }
}

export class AuthController {
  static register = async (req: Request, res: Response): Promise<void> => {
    if (!req.role) return this.RoleNotFound(res);
    if (req.role === "user") return await AuthUser.register(req, res);
    if (req.role === "captain") return await AuthCaptain.register(req, res);
  }

  static login = async (req: Request, res: Response): Promise<void> => {
    if (!req.role) return this.RoleNotFound(res);
    if (req.role === "user") return await AuthUser.login(req, res);
    if (req.role === "captain") return await AuthCaptain.login(req, res);
  }

  static logout = async (req: Request, res: Response): Promise<void> => {
    if (!req.role) return this.RoleNotFound(res);
    if (req.role === "user") return await AuthUser.logout(req, res);
    if (req.role === "captain") return await AuthCaptain.logout(req, res);
  }

  private static RoleNotFound(res: Response): void {
    return ResponseUtils.sendErrorResponse(res, 400, "Role not found!");
  }
}
