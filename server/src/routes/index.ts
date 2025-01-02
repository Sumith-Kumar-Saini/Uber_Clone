import { Router } from "express";
import AuthRouter from "./auth.routes";
import UserRouter from "./user.routes";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
// router.use("/captain", CaptainRouter);

export default router;