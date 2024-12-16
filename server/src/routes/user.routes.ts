import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const UserRouter = Router();

UserRouter.get("/profile", AuthMiddleware.verifyAuthToken, UserController.profile)

export default UserRouter;