import { Schema } from "mongoose";
import { commonFieldsSchema } from "./shared/common.schema";
import { ICaptain } from "@/types/captain.types";

/**
 * Defines the Mongoose schema for the Captain model.
 * 
 * This schema includes fields for the captain's status, vehicle details, and location.
 * It also includes the common fields defined in the commonFieldsSchema.
 */
export const CaptainSchema = new Schema<ICaptain>({
  ...commonFieldsSchema,
  /**
   * Represents the captain's status.
   * 
   * @property {String} status - The captain's status, either "active" or "inactive".
   * Defaults to "inactive".
   */
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  /**
   * Represents the captain's vehicle details.
   * 
   * @property {{ color: String; plateCode: String; capacity: Number; type: String; }} vehicle - The vehicle details.
   */
  vehicle: {
    /**
     * Represents the vehicle's color.
     * 
     * @property {String} color - The vehicle's color.
     */
    color: {
      type: String,
      required: true,
    },
    /**
     * Represents the vehicle's plate code.
     * 
     * @property {String} plateCode - The vehicle's plate code.
     */
    plateCode: {
      type: String,
      required: true,
    },
    /**
     * Represents the vehicle's capacity.
     * 
     * @property {Number} capacity - The vehicle's capacity.
     * Must be at least 1.
     */
    capacity: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: function(v) {
          return v >= 1;
        },
        message: 'Capacity must be at least 1.'
      },
    },
    /**
     * Represents the vehicle's type.
     * 
     * @property {String} type - The vehicle's type, either "2_wheeler", "3_wheeler", or "4_wheeler".
     */
    type: {
      type: String,
      required: true,
      enum: ["2_wheeler", "3_wheeler", "4_wheeler"],
    },
  },
  /**
   * Represents the captain's location.
   * 
   * @property {{ latitude: Number; longitude: Number; }} location - The captain's location.
   */
  location: {
    /**
     * Represents the latitude of the location.
     * 
     * @property {Number} latitude - The latitude of the location.
     */
    latitude: {
      type: Number,
    },
    /**
     * Represents the longitude of the location.
     * 
     * @property {Number} longitude - The longitude of the location.
     */
    longitude: {
      type: Number,
    },
  },
});
