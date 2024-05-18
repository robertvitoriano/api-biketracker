import { Router, Response, Request } from "express";

import auth from "../middleware/auth";
import { multerUpload } from "../utils";
import { storeLocationController } from "../domain/location/useCases/StoreLocation";

const locationRouter = Router();
locationRouter.post(
  "/",
  auth,
  multerUpload.single("image"),
  (request: Request, response: Response) =>
    storeLocationController.handle(request, response)
);

export default locationRouter;
