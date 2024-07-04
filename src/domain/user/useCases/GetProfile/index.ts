import { GetProfileController } from "./GetProfileController";
import { GetProfileUseCase } from "./GetProfileUseCase";
import { userRepository } from "../../repositories/factories/UserRepositoryFactory";

const getProfileUseCase = new GetProfileUseCase(userRepository);

const getProfileController = new GetProfileController(getProfileUseCase);

export { getProfileUseCase, getProfileController };
