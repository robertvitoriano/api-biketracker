import { Router } from "express";
import userRouter from "./user";
import emailRouter from "./email";
import trackRouter from "./track";

const router = Router();

router.use(emailRouter);
router.use(userRouter);
router.use("/tracks", trackRouter);
export default router;
