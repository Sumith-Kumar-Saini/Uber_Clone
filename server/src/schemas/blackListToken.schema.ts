import { Schema } from "mongoose";

/**
 * Defines the Mongoose schema for the BlackListToken model.
 * 
 * This schema includes fields for the blacklisted JWT token and its expiration time.
 */
export const BlackListTokenSchema = new Schema({
  /**
   * Represents the blacklisted JWT token.
   * 
   * @property {String} token - The blacklisted JWT token.
   */
  token: {
    type: String,
    required: true,
    unique: true
  }
}, {
  /**
   * Enables TTL (time-to-live) for the schema, which automatically removes documents after a specified time.
   * 
   * In this case, the TTL is set to 24 hours.
   */
  timestamps: true,
  expireAfterSeconds: 24 * 60 * 60 // 24 hours in seconds
});

