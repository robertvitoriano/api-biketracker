import { GetUserTracksController } from "./GetUserTracksController";
import { GetUserTracksUseCase } from "./GetUserTracksUseCase";
import { trackRepository } from "./../../repositories/factories/TrackRepositoryFactory";

const createUserUseCase = new GetUserTracksUseCase(trackRepository);

const getUserTracksController = new GetUserTracksController(createUserUseCase);

export { createUserUseCase, getUserTracksController };
