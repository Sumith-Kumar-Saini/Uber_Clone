import { model } from "mongoose";
import { ICaptain, ICaptainModel } from "@/types/captain.types";
import { CaptainSchema } from "@/schemas/captain.schema";

/**
 * Defines the Captain Model based on the CaptainSchema with ICaptain and ICaptainModel interfaces.
 * 
 * @property {model<ICaptain, ICaptainModel>} CaptainModel - The Mongoose model for the Captain.
 */
export const CaptainModel = model<ICaptain, ICaptainModel>("Captain", CaptainSchema);