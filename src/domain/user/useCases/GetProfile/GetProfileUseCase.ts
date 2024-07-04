import { IUserRepository } from "../../repositories/IUserRepository";

class GetProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userEmail) {
    const user = await this.userRepository.findByCredentials({
      email: userEmail,
    });
    return user;
  }
}

export { GetProfileUseCase };
