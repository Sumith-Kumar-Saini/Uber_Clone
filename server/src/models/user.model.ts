import { model } from "mongoose";
import { IUser } from "../types/user.types";
import { UserSchema } from "../schemas/user.schema";

export const UserModel = model<IUser>('User', UserSchema);