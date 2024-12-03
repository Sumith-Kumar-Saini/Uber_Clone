import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthValidator } from "../validators/auth.validator";

// Initialize the Express router.
const router = Router();

// Define the route for user registration.
// This route validates the request body for email, fullname, and password before processing the registration.
router.post("/register", AuthValidator.validateRegistration(), AuthController.registerUser);

// Define the route for user login.
// This route validates the request body for email and password before processing the login.
router.post("/login", AuthValidator.validateLogin(), AuthController.loginUser);

// Define the route for logging out the user.
// This route clears the authentication cookie to log out the user.
router.post("/logout", AuthController.logoutUser);

// Export the router to be used in the application.
export default router;
