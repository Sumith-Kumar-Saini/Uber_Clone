// user.schema.ts
import { Schema } from "mongoose";
import { IUser } from "../types/user.types";

export const UserSchema = new Schema<IUser>(
  {
    fullname: {
      firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"], // Minimum length for first name
      },
      lastName: {
        type: String,
        required: true,
        minlength: [3, "Last name must be at least 3 characters long"], // Minimum length for last name
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression to validate email format
    },
    password: {
      type: String,
      required: true,
    },
    socketID: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);
