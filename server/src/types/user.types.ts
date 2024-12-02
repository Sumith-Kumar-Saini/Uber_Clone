import { Document, Model, ObjectId } from "mongoose";

/**
 * Represents a User document in the database.
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
 * Extends the Model interface to include methods specific to the User model.
 */
export interface IUserModel extends Model<IUser> {}

/**
 * Represents a user object without the MongoDB document properties.
 */
export interface UserObj {
  email: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
}
