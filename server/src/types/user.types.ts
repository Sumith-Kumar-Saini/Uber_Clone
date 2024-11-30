import { Document, Model, ObjectId } from "mongoose";

/**
 * Interface representing a User document.
 */
export interface IUser extends Document {
  _id: ObjectId;
  email: string;
  password: string;
  fullName: {
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

export interface UserObj {
  email: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
}
