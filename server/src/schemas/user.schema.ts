import { Schema } from "mongoose";
import { IUser } from "../types/user.types";
import { commonFieldsSchema } from "./shared/common.schema";

/**
 * Defines the Mongoose schema for the User model.
 * 
 * This schema includes fields for the user's full name, email, password, and socket ID.
 * It also includes timestamps for createdAt and updatedAt.
 */
export const UserSchema = new Schema<IUser>({
  ...commonFieldsSchema,
}, {
  timestamps: true
}); // Automatically adds createdAt and updatedAt fields