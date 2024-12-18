import { Router } from "express";
import { UserAuthController } from "@/controllers/auth.controller";
import { AuthValidator } from "@/validators/auth.validator";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
import { HandleAuthMiddleware } from "@/middlewares/handleAuth.middleware";
import { roleCheck, RoleHandle } from "@/middlewares/roleCheck.middleware";

// Initialize the Express router for authentication routes.
const router = Router();
const roleHandle = new RoleHandle();

router.use(roleHandle.checkMiddleware);
const handleAuthMiddleware = new HandleAuthMiddleware(roleHandle.role)


// Authentication Routes
router.post("/register", handleAuthMiddleware.register, UserAuthController.registerUser);
router.post("/login", handleAuthMiddleware.login, UserAuthController.loginUser);
router.get("/logout", handleAuthMiddleware.logout, UserAuthController.logoutUser);

// Export the authentication router.
export default router;
