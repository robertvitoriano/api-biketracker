import { IUserRepository } from "../../repositories/IUserRepository";
import { IUser } from "../../types";
import bcrypt from "bcryptjs";
class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute({
    email,
    username,
    password,
    avatar,
    name,
    weight,
  }: IUser): Promise<IUser> {
    const user = await this.userRepository.update({
      email,
      username,
      password,
      avatar,
      name,
      weight,
    });

    return user;
  }
}

export { UpdateUserUseCase };
