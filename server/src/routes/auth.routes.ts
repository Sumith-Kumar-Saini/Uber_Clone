import { Router } from "express";
import { UserAuthController } from "@/controllers/auth.controller";
import { AuthHandlerMiddleware } from "@/middlewares/authHandler.middleware";

// Initialize the Express router for authentication routes.
const router = Router();
// Authentication Middlewares.
router.use(AuthHandlerMiddleware.roleCheck)

// Authentication Routes.
router.post("/register", AuthHandlerMiddleware.register, UserAuthController.registerUser);
router.post("/login", AuthHandlerMiddleware.login, UserAuthController.loginUser);
router.get("/logout", AuthHandlerMiddleware.logout, UserAuthController.logoutUser);

// Export the authentication router.
export default router;
