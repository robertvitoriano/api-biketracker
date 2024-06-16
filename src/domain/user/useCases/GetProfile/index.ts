import { GetProfileController } from "./GetProfileController";
import { GetProfileUseCase } from "./GetProfileUseCase";

const getProfileUseCase = new GetProfileUseCase();

const getProfileController = new GetProfileController(getProfileUseCase);

export { getProfileUseCase, getProfileController };
