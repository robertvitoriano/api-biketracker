import { GetUserTracksController } from "./GetUserStatisticsController";
import { GetUserStatisticsUseCase } from "./GetUserStatisticsUseCase";
import { trackRepository } from "./../../repositories/factories/TrackRepositoryFactory";

const getUserStatisticsUseCase = new GetUserStatisticsUseCase(trackRepository);

const getUserStatisticsController = new GetUserTracksController(
  getUserStatisticsUseCase
);

export { getUserStatisticsUseCase, getUserStatisticsController };
