import { Document, Model, ObjectId } from "mongoose";

/**
 * Defines the structure of a Captain document in the database.
 * 
 * @property {ObjectId} _id - The unique identifier for the document.
 * @property {{ firstName: string; lastName: string; }} fullName - The Captain's full name.
 * @property {string} email - The Captain's email address.
 * @property {string} password - The Captain's password.
 * @property {string} socketID - The Captain's socket identifier.
 * @property {"active" | "inactive"} status - The Captain's status, either active or inactive.
 * @property {{ color: string; plateCode: string; capacity: number; type: '2_wheeler' | '3_wheeler' | '4_wheeler'; }} vehicle - Represents the Captain's vehicle.
 * @property {{ latitude: number; longitude: number; }} location - Represents the Captain's location.
 * @property {Date} createdAt - The date and time the document was created.
 * @property {Date} updatedAt - The date and time the document was last updated.
 */
export interface ICaptain extends Document {
  _id: ObjectId;
  fullName: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  socketID: string;
  status: "active" | "inactive";
  vehicle: {
    color: string;
    plateCode: string;
    capacity: number;
    type: "TwoWheeler" | "ThreeWheeler" | "FourWheeler";
  };
  location: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Extends the Model interface to include methods specific to the Captain model.
 * This interface is used to define the structure of the Captain model.
 */
export interface ICaptainModel extends Model<ICaptain> {}

/**
 * Represents a Captain object without the MongoDB document properties.
 * This interface is used to define the structure of a Captain object without the document properties.
 * 
 * @property {{ firstName: string; lastName: string; }} fullName - The Captain's full name.
 * @property {string} email - The Captain's email address.
 * @property {string} password - The Captain's password.
 * @property {string} socketID - The Captain's socket identifier.
 * @property {"active" | "inactive"} status - The Captain's status, either active or inactive.
 * @property {{ color: string; plateCode: string; capacity: number; type: '2_wheeler' | '3_wheeler' | '4_wheeler'; }} vehicle - Represents the Captain's vehicle.
 * @property {{ latitude: number; longitude: number; }} location - Represents the Captain's location.
 */
export interface CaptainRegisterObj {
  fullName: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  vehicle: {
    color: string;
    plateCode: string;
    capacity: number;
    type: "TwoWheeler" | "ThreeWheeler" | "FourWheeler";
  };
}

export interface CaptainLoginObj {
  email: string;
  password: string;
}