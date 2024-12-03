// Status Code Mapping
// Maps error messages to their corresponding HTTP status codes
export const statusCodeMap: Record<string, number> = {
  "Validation failed": 400,
  "An unexpected error occurred": 500,
  "User registered successfully": 201,
  "Invalid credentials": 401,
  "User logged in successfully": 200,
  "Logged out successfully": 200,
  "User not found": 404,
  "Invalid password": 401,
  "Email address already exists": 409,
  "Missing required fields": 400,
};

// Default Status Code
// Fallback HTTP status code for unhandled error messages
export const defaultStatusCode = 500;

// Error Messages
// Collection of error messages for specific scenarios
export const errorMessages = {
  MISSING_REQUIRED_FIELDS: "Missing required fields: email and password are mandatory",
  USER_NOT_FOUND: "User not found",
  INVALID_CREDENTIALS: "Invalid credentials",
  INVALID_PASSWORD: "Invalid password",
  EMAIL_EXISTS: "Email address already exists",
};