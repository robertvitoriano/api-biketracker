import { Router, Response, Request } from "express";

import auth from "../middleware/auth";
import { storeNewUserTrackController } from "../domain/track/useCases/StoreNewUserTrackUseCase";
import { getUserTracksController } from "../domain/track/useCases/GetUserTracks";
import { getUserStatisticsController } from "../domain/track/useCases/GetUserStatistics";
const trackRouter = Router();
trackRouter.post("/", auth, (request: Request, response: Response) =>
  storeNewUserTrackController.handle(request, response)
);
trackRouter.get("/statistics", auth, (request: Request, response: Response) =>
  getUserStatisticsController.handle(request, response)
);
trackRouter.get("/", auth, (request: Request, response: Response) =>
  getUserTracksController.handle(request, response)
);
export default trackRouter;
