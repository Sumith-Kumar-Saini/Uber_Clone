import { model } from "mongoose";
import { IUser, IUserModel } from "../types/user.types";
import { UserSchema } from "../schemas/user.schema";

/**
 * User Model based on UserSchema with IUser and IUserModel interfaces.
 */
export const UserModel = model<IUser, IUserModel>("User", UserSchema);