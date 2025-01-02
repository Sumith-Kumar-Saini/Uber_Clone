import { Router } from "express";
import { AuthController } from "@/controllers/auth.controller";
import AuthMiddleware from "@/middlewares/auth";

// Initialize the Express router for authentication routes.
const router = Router();

// Authentication Middlewares.
router.use(AuthMiddleware.verifyRole);

// user Authentication Routes.
router.post("/register",  AuthMiddleware.register, AuthController.register);
router.post("/login", AuthMiddleware.login, AuthController.login);
router.get("/logout", AuthMiddleware.logout, AuthController.logout);

// Export the authentication router.
export default router;
