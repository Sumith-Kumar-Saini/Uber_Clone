import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { defaultStatusCode, statusCodeMap } from "@/constants/statusMessages.constant";
import { ErrorObject } from "@/types/error.types";

/**
 * Utility class for handling responses in a standardized way.
 */
export class ResponseUtils {
  /**
   * Handles validation errors and returns a standard response object if errors exist.
   * @param req - Express request object
   * @returns Validation error response object or null if no errors.
   */
  static handleValidationErrors(req: Request): { success: false; message: string; errors: any[] } | null {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return {
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      };
    }
    return null;
  }

  /**
   * Sends a standardized error response.
   * @param res - Express response object
   * @param error - Error object or string
   */
  static sendErrorResponse(res: Response, status: number, error: Error | string): void {
    res.status(status).json({
      success: false,
      message: typeof error === 'string' ? error : error.message || "An unexpected error occurred",
      stack: process.env.NODE_ENV === "development" ? (error as Error).stack : undefined,
    });
  }

  /**
   * Handles errors and sends a standardized error response.
   * @param res - Express response object
   * @param error - Error object
   */
  static ErrorHandler(res: Response, error: ErrorObject): void {
    const message = error.message || error.error;
    const statusCode = this.getStatusCode(message);
    res.status(statusCode).json({ success: false, message, error: error.error });
  }

  /**
   * Sets the authentication token cookie and sends a response.
   * 
   * @param res - Express response object.
   * @param responseContext - Response context.
   */
  static setCookieAndRespond(res: Response, responseContext: { status: number, data: object, token: string }): void {
    res.cookie("token", responseContext.token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 });
    res.status(responseContext.status).json(responseContext.data);
  }

  /**
   * Gets the status code for a given message.
   * @param message - The message to get the status code for
   * @returns The status code for the message
   */
  private static getStatusCode(message: string): number {
    return statusCodeMap[message] ?? defaultStatusCode;
  }
}
