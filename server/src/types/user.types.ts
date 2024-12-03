import { Document, Model, ObjectId } from "mongoose";

/**
 * Defines the structure of a User document in the database.
 * 
 * @property {ObjectId} _id - The unique identifier for the document.
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 * @property {{ firstName: string; lastName: string; }} fullName - The user's full name.
 * @property {string} socketID - The user's socket identifier.
 * @property {Date} createdAt - The date and time the document was created.
 * @property {Date} updatedAt - The date and time the document was last updated.
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
 * This interface is used to define the structure of the User model.
 */
export interface IUserModel extends Model<IUser> {}

/**
 * Represents a user object without the MongoDB document properties.
 * This interface is used to define the structure of a user object without the document properties.
 * 
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 * @property {{ firstName: string; lastName: string; }} fullName - The user's full name.
 */
export interface UserObj {
  email: string;
  password: string;
  fullName?: {
    firstName: string;
    lastName: string;
  };
}
