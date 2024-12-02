import { body } from "express-validator";

export class AuthValidator {
  /**
   * Validates the request body for user registration.
   * @returns An array of validation rules for registration.
   */
  static validateRegistration() {
    return [
      body("email").isEmail().withMessage("Invalid Email"),
      body("fullName.firstName").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
      body("fullName.lastName").optional().isLength({ min: 3 }).withMessage("Last name must be at least 3 characters long"),
      body("password").isStrongPassword({ minLength: 8 }).withMessage("Password must be at least 8 characters long and strong"),
    ];
  }

  /**
   * Validates the request body for user login.
   * @returns An array of validation rules for login.
   */
  static validateLogin() {
    return [
      body("email").isEmail().withMessage("Invalid Email"),
      body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    ];
  }
}