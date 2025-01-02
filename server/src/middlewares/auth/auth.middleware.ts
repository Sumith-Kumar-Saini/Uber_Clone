import { NextFunction, Request, Response } from "express";
import { AuthValidator } from "./validation.middleware";
import { Verify } from "./verify.middleware";
import { Roles } from "@/types/roles.types";

class Helper {
  static RoleNotFound(res: Response) {
    return res.status(400).json({ message: "Role not found!" });
  }
}

export class Middleware {
  static register(role: Roles) {
    switch (role) {
      case "user":
        return AuthValidator.getRules("user", "register");
      case "captain":
        return AuthValidator.getRules("captain", "register");
      default:
        return Helper.RoleNotFound;
    }
  }

  static login(role: Roles) {
    switch (role) {
      case "user":
        return AuthValidator.getRules("user", "login");
      case "captain":
        return AuthValidator.getRules("captain", "login");
      default:
        return Helper.RoleNotFound;
    }
  }

  static verify(role: Roles) {
    switch (role) {
      case "user":
        return Verify.user;
      case "captain":
        return Verify.captain;
      default:
        return () => {};
    }
  }
}
