import { Request, Response } from "express";
import { validationResult } from "express-validator";

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
  static sendErrorResponse(res: Response, error: unknown): void {
    res.status(400).json({
      success: false,
      message: (error as Error).message || "An unexpected error occurred",
      stack:
        process.env.NODE_ENV === "development"
          ? (error as Error).stack
          : undefined,
    });
  }
}
