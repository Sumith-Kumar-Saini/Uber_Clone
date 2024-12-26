import { Roles } from "@/types/roles.types";
import { ValidationRules } from "@/utils/validationRules.utils";

/**
 * Validator class for handling authentication validations dynamically.
 */
export class AuthValidator {
  /**
   * Generate validation rules based on user type and action.
   * @param {string} type - The type of user ('user' or 'captain').
   * @param {string} action - The action ('register' or 'login').
   * @returns An array of validation rules.
   */
  static getRules(type: Roles, action: "register" | "login") {
    const isRegistration = action === "register";
    const isCaptain = type === "captain";

    const rules = [
      ValidationRules.email(),
      ValidationRules.password(8, isRegistration),
    ];

    if (isRegistration) {
      rules.push(
        ValidationRules.Name("fullName.firstName"),
        ValidationRules.optionalName("fullName.lastName")
      );

      if (isCaptain) {
        rules.push(
          ValidationRules.vehicleColor(),
          ValidationRules.vehiclePlate(),
          ValidationRules.vehicleCapacity(),
          ValidationRules.vehicleType()
        );
      }
    }

    return rules;
  }
}