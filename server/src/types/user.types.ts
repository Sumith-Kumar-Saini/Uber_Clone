import { Document, Model } from "mongoose";

/**
 * Interface representing a User document.
 */
export interface IUser extends Document {
  email: string;
  password: string;
  fullname: {
    firstName: string;
    lastName: string;
  };
  socketID: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface for additional User model-specific methods.
 * Currently, no additional methods are required.
 */
export interface IUserModel extends Model<IUser> {}