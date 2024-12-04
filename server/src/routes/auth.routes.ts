import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthValidator } from "../validators/auth.validator";

// Initialize the Express router for authentication routes.
const authRouter = Router();

// Authentication Routes
authRouter.post("/register", AuthValidator.validateRegistration(), AuthController.registerUser);
authRouter.post("/login", AuthValidator.validateLogin(), AuthController.loginUser);
authRouter.get("/logout", AuthController.logoutUser);

// Export the authentication router.
export default authRouter;
