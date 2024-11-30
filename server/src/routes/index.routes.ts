import { Router } from 'express';
import { IndexController } from '../controllers/index.controller';

const router = Router();

router.get("/", IndexController.getHome);

export default router;