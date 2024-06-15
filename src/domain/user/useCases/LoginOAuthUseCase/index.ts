import { LoginOAuthUseCase } from "./LoginOAuthUseCase";
import { userRepository } from "../../repositories/factories/UserRepositoryFactory";

const loginOAuthUseCase = new LoginOAuthUseCase(userRepository);

export { loginOAuthUseCase };
