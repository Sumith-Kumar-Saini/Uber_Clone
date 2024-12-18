import { AuthMiddleware as AllAuthMiddleware } from "./auth.middleware";
import { AuthValidator } from "@/validators/auth.validator";
import { Roles } from "@/types/roles.types";

export class HandleAuthMiddleware {
    
  constructor(private role?: Roles) {
    
  }

  get register() {
    if (this.role === "user") return AuthValidator.validateUserRegistration;
    else if (this.role === "captain") return AuthValidator.validateCaptainRegistration;
    else return [];
  }

  get login() {
    if (this.role === "user") return AuthValidator.validateUserLogin;
    else if (this.role === "captain") return AuthValidator.validateCaptainLogin;
    else return [];
  }

  get logout() {
    if (this.role === "user") return AllAuthMiddleware.verifyUserAuthToken;
    else if (this.role === "captain") return AllAuthMiddleware.verifyCaptainAuthToken;
    else return [];
  }

  
}