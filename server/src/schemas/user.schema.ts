import { Schema } from "mongoose";
import { IUser } from "../types/user.types";

/**
 * Defines the Mongoose schema for the User model.
 * 
 * This schema includes fields for the user's full name, email, password, and socket ID.
 * It also includes timestamps for createdAt and updatedAt.
 */
export const UserSchema = new Schema<IUser>({
  /**
   * Represents the user's full name, including first and last names.
   * 
   * @property {Object} fullName - The user's full name.
   * @property {String} fullName.firstName - The user's first name.
   * @property {String} fullName.lastName - The user's last name.
   */
  fullName: {
    firstName: { 
      type: String, 
      required: true, 
      minlength: 3, 
      minlengthError: "First name must be at least 3 characters long" 
    },
    lastName: { 
      type: String, 
      minlength: 3, 
      minlengthError: "Last name must be at least 3 characters long" 
    }
  },
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
    matchError: "Invalid Email" 
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
    select: false 
  },
  /**
   * Represents the user's socket ID.
   * 
   * @property {String} socketID - The user's socket ID.
   */
  socketID: { 
    type: String 
  },
}, { 
  timestamps: true 
}); // Automatically adds createdAt and updatedAt fields