import { GetLocationsController } from "./GetLocationsController";
import { GetLocationsUseCase } from "./GetLocationsUseCase";
import { locationRepository } from "../../repositories/factories/LocationRepositoryFactory";

const getLocationsUseCase = new GetLocationsUseCase(locationRepository);

const getLocationsController = new GetLocationsController(getLocationsUseCase);

export { getLocationsUseCase, getLocationsController };
