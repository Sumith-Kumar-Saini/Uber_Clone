import { AuthValidator } from "@/validators/auth.validator";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
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
        return AuthMiddleware.verifyUser;
      case "captain":
        return AuthMiddleware.verifyCaptain;
      default:
        return () => {};
    }
  }
}

export class RoleUtils {
  static middleware = Middlewares;
}

