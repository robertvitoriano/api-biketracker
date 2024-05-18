import { Router } from "express";
import userRouter from "./user";
import emailRouter from "./email";
import trackRouter from "./track";
import locationRouter from "./location";

const router = Router();

router.use(emailRouter);
router.use(userRouter);
router.use("/tracks", trackRouter);
router.use("/locations", locationRouter);

export default router;
