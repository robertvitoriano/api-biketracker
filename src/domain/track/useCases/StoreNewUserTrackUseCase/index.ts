import { StoreNewUserTrackController } from "./StoreNewUserTrackController";
import { StoreNewUserTrackUseCase } from "./StoreNewUserTrackUseCase";
import { trackRepository } from "./../../repositories/factories/TrackRepositoryFactory";

const createUserUseCase = new StoreNewUserTrackUseCase(trackRepository);

const storeNewUserTrackController = new StoreNewUserTrackController(
  createUserUseCase
);

export { createUserUseCase, storeNewUserTrackController };
