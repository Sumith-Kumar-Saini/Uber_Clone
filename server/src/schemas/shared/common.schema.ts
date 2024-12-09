import { Schema } from "mongoose";
/**
 * Represents the user's full name, including first and last names.
 *
 * @property {Object} fullName - The user's full name.
 * @property {String} fullName.firstName - The user's first name.
 * @property {String} fullName.lastName - The user's last name.
 */
export const fullNameSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    minlengthError: "First name must be at least 3 characters long",
  },
  lastName: {
    type: String,
    minlength: 3,
    minlengthError: "Last name must be at least 3 characters long",
  },
});
export const commonFieldsSchema = {
  fullName: fullNameSchema,
  /**
   * Represents the user's email address.
   *
   * @property {String} email - The user's email address.
   *
   * Validates the email format using a regular expression.
   */
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    matchError: "Invalid Email",
  },
  /**
   * Represents the user's password.
   *
   * @property {String} password - The user's password.
   *
   * Excludes the password from being selected by default in queries.
   */
  password: {
    type: String,
    required: true,
    select: false,
  },
  /**
   * Represents the user's socket ID.
   *
   * @property {String} socketID - The user's socket ID.
   */
  socketID: {
    type: String,
  },
};
