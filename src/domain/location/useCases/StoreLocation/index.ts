import { StoreLocationController } from "./StoreLocationController";
import { StoreLocationUseCase } from "./StoreLocationUseCase";
import { locationRepository } from "../../repositories/factories/LocationRepositoryFactory";

const createUserUseCase = new StoreLocationUseCase(locationRepository);

const storeLocationController = new StoreLocationController(createUserUseCase);

export { createUserUseCase, storeLocationController };
