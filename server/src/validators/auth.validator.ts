import { body } from "express-validator";

/**
 * Represents a class for validating user authentication requests.
 */
export class AuthValidator {
  /**
   * Validates the request body for user registration.
   * This method ensures that the registration request meets the required criteria.
   *
   * @returns An array of validation rules for registration.
   */
  static get validateUserRegistration() {
    return [
      // Validate email to ensure it's in the correct format
      body("email").isEmail().withMessage("Invalid Email"),
      // Validate first name to ensure it's at least 3 characters long
      body("fullName.firstName")
        .isLength({ min: 3 })
        .withMessage("First name must be at least 3 characters long"),
      // Validate last name to ensure it's at least 3 characters long if provided
      body("fullName.lastName")
        .optional()
        .isLength({ min: 3 })
        .withMessage("Last name must be at least 3 characters long"),
      // Validate password to ensure it's strong and at least 8 characters long
      body("password")
        .isStrongPassword({ minLength: 8 })
        .withMessage("Password must be at least 8 characters long and strong"),
    ];
  }

  /**
   * Validates the request body for user login.
   * This method ensures that the login request meets the required criteria.
   *
   * @returns An array of validation rules for login.
   */
  static get validateUserLogin() {
    return [
      // Validate email to ensure it's in the correct format
      body("email").isEmail().withMessage("Invalid Email"),
      // Validate password to ensure it's at least 8 characters long
      body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    ];
  }

  static validateCaptainRegistration() {}

  static validateCaptainLogin() {}
}
