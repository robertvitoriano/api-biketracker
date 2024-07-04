import { UpdateUserUseCase } from "./UpdateUserCase";
import { UpdateUserController } from "./UpdateUserController";
import { userRepository } from "../../repositories/factories/UserRepositoryFactory";

const updateUserUseCase = new UpdateUserUseCase(userRepository);
const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserUseCase, updateUserController };
