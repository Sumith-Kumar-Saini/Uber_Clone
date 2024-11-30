import { Schema } from "mongoose";
import { IUser } from "../types/user.types";

/**
 * Mongoose schema for User.
 */
export const UserSchema = new Schema<IUser>(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
      },
      lastName: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email format validation
    },
    password: {
      type: String,
      required: true,
      select: false, // Exclude password by default in queries
    },
    socketID: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);