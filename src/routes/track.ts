import { Router, Response, Request } from "express";

import auth from "../middleware/auth";
import { storeNewUserTrackController } from "../domain/track/useCases/StoreNewUserTrackUseCase";
import { getUserTracksController } from "../domain/track/useCases/GetUserTracks";
import { getUserStatisticsController } from "../domain/track/useCases/GetUserStatistics";
import { multerUpload } from "../utils";
import { deleteTrackController } from "../domain/track/useCases/DeleteTrack";

const trackRouter = Router();
trackRouter.post(
  "/",
  auth,
  multerUpload.single("image"),
  (request: Request, response: Response) =>
    storeNewUserTrackController.handle(request, response)
);
trackRouter.get("/statistics", auth, (request: Request, response: Response) =>
  getUserStatisticsController.handle(request, response)
);
trackRouter.get("/", auth, (request: Request, response: Response) =>
  getUserTracksController.handle(request, response)
);
trackRouter.delete("/:trackId", auth, (request: Request, response: Response) =>
  deleteTrackController.handle(request, response)
);
export default trackRouter;
