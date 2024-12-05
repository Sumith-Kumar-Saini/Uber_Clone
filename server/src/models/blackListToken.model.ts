import { model } from "mongoose";
import { BlackListTokenSchema } from "../schemas/blackListToken.schema";

/**
 * Defines the BlackListToken Model based on the BlackListTokenSchema.
 * 
 * @property {model} BlackListTokenModel - The Mongoose model for the BlackListToken.
 */
export const BlackListTokenModel = model("BlackListToken", BlackListTokenSchema);
