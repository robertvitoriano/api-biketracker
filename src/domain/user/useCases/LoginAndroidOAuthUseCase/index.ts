import { LoginAndroidOAuthController } from "./LoginAndroidOAuthController";
import { LoginAndroidOAuthUseCase } from "./LoginAndroidOAuthUseCase";
import { userRepository } from "../../repositories/factories/UserRepositoryFactory";

const loginAndroidOAuthUseCase = new LoginAndroidOAuthUseCase(userRepository);
const loginAndroidOAuthController = new LoginAndroidOAuthController(
  loginAndroidOAuthUseCase
);

export { loginAndroidOAuthController, loginAndroidOAuthUseCase };
