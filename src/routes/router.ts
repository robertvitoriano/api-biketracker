import { Router } from "express";
import userRouter from "./user";
import emailRouter from "./email";
import trackRouter from "./track";
import locationRouter from "./location";
import oauthRouter from "./oauth";
const router = Router();

router.use(emailRouter);
router.use(userRouter);
router.use(oauthRouter);
router.use("/tracks", trackRouter);
router.use("/locations", locationRouter);

export default router;
