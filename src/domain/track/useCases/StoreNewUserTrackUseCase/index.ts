import { StoreNewUserTrackController } from "./StoreNewUserTrackController";
import { StoreNewUserTrackUseCase } from "./StoreNewUserTrackUseCase";
import { trackRepository } from "./../../repositories/factories/TrackRepositoryFactory";
import { locationRepository } from "../../../location/repositories/factories/LocationRepositoryFactory";

const storeNewTrackUseCase = new StoreNewUserTrackUseCase(
  trackRepository,
  locationRepository
);

const storeNewUserTrackController = new StoreNewUserTrackController(
  storeNewTrackUseCase
);

export { storeNewTrackUseCase, storeNewUserTrackController };
