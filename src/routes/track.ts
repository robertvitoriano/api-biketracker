import { Router, Response, Request } from "express";

import auth from "../middleware/auth";
import { storeNewUserTrackController } from "../domain/track/useCases/StoreNewUserTrackUseCase";

const trackRouter = Router();
trackRouter.post("/", auth, (request: Request, response: Response) =>
  storeNewUserTrackController.handle(request, response)
);

export default trackRouter;
