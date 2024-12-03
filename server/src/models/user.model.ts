import { model } from "mongoose";
import { IUser, IUserModel } from "../types/user.types";
import { UserSchema } from "../schemas/user.schema";

/**
 * Defines the User Model based on the UserSchema with IUser and IUserModel interfaces.
 * 
 * @property {model<IUser, IUserModel>} UserModel - The Mongoose model for the User.
 */
export const UserModel = model<IUser, IUserModel>("User", UserSchema);