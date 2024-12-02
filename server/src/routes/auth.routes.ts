import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthValidator } from "../validators/auth.validator";

const router = Router();

// Route for user registration.
// Validates request body for email, fullname, and password.
router.post("/register", AuthValidator.validateRegistration(), AuthController.registerUser);

// Route for user login.
// Validates request body for email and password.
router.post("/login", AuthValidator.validateLogin(), AuthController.loginUser);

// Route for logging out the user.
// Clears the authentication cookie to log out the user.
router.post("/logout", AuthController.logoutUser);

export default router;
