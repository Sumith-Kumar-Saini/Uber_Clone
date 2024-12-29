import { AuthValidator } from "@/validators/auth.validator";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
import { AuthController } from "@/controllers/auth.controller";
import { Roles } from "@/types/roles.types";

class Middlewares {
  static register(role: Roles) {
    switch (role) {
      case "user":
        return AuthValidator.getRules("user", "register");
      case "captain":
        return AuthValidator.getRules("captain", "register");
      default:
        return [];
    }
  }

  static login(role: Roles) {
    switch (role) {
      case "user":
        return AuthValidator.getRules("user", "login");
      case "captain":
        return AuthValidator.getRules("captain", "login");
      default:
        return [];
    }
  }

  static logout(role: Roles) {
    switch (role) {
      case "user":
        return AuthMiddleware.verifyUserAuthToken;
      case "captain":
        return AuthMiddleware.verifyCaptainAuthToken;
      default:
        return () => {};
    }
  }
}

export class RoleUtils {
  static middleware = Middlewares;
  /**
   * not for now!
   */
  // static controller = Controllers;
}

