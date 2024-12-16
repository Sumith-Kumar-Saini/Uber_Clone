import { Router } from "express";
import { UserAuthController } from "../controllers/Auth.controller";
import { AuthValidator } from "../validators/auth.validator";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { roleCheck } from "../middlewares/roleCheck.middleware";

// Initialize the Express router for authentication routes.
const authRouter = Router();

authRouter.use(roleCheck());

// User Authentication Routes
authRouter.post("/user/register", AuthValidator.validateRegistrationInput, UserAuthController.registerUser);
authRouter.post("/user/login", AuthValidator.validateLoginInput, UserAuthController.loginUser);
authRouter.get("/user/logout", AuthMiddleware.verifyAuthToken, UserAuthController.logoutUser);

// Captain Authentication Routes
authRouter.post("/captain/register")
authRouter.post("/captain/login")
authRouter.get("/captain/logout")

// Export the authentication router.
export default authRouter;
