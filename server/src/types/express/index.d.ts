import { Request, Response } from "express";
import { IUser } from "../../types/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      role?: "user" | "captain";
    }
  }
}