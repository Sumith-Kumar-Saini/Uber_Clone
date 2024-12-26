import { Request, Response } from "express";
import { IUser } from "@/types/user.types";
import { Roles } from "@/types/roles.types";
import { ICaptain } from "../captain.types";

declare global {
  namespace Express {
    interface Request {
      captain?: ICaptain;
      user?: IUser;
      role?: Roles;
    }
  }
}