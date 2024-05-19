import { DeleteTrackController } from "./DeleteTrackController";
import { DeleteTrackUseCase } from "./DeleteTrackUseCase";
import { trackRepository } from "./../../repositories/factories/TrackRepositoryFactory";
import { locationRepository } from "../../../location/repositories/factories/LocationRepositoryFactory";

const deleteTrackUseCase = new DeleteTrackUseCase(
  trackRepository,
  locationRepository
);

const deleteTrackController = new DeleteTrackController(deleteTrackUseCase);

export { deleteTrackUseCase, deleteTrackController };
