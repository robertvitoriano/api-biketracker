import { Router } from "express";
import userRouter from "./user";
import emailRouter from "./email";

const router = Router();

router.use(emailRouter);
router.use(userRouter);

export default router;
