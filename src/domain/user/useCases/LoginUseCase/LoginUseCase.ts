import { IUserRepository } from "./../../repositories/IUserRepository";
import { IUserCredentials, IUser } from "./../../types";
import { generateAuthToken } from "./../../../../utils";
import bcrypt from "bcryptjs";
class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute({
    email,
    username,
    password,
  }: IUserCredentials): Promise<{
    user: { email: string; name: string; username: string };
    token: string;
  }> {
    const user = await this.userRepository.findByCredentials({
      email,
      username,
    });

    if (!user) throw new Error("Unable to login !");
    const token = await generateAuthToken(user._id);

    if (!token) throw new Error("Unable to login !");

    const isPasswordValid = await this.verifyPassword({
      password,
      userInstanceEndcodedPassword: user.password,
    });

    if (!isPasswordValid) throw new Error("Unable to login !");
    return {
      user: { name: user.name, email: user.email, username: user.username },
      token,
    };
  }

  private async verifyPassword({ password, userInstanceEndcodedPassword }) {
    if (!password && !userInstanceEndcodedPassword) return;

    const isMatch = await bcrypt.compare(
      password,
      userInstanceEndcodedPassword
    );
    return isMatch;
  }
}

export { LoginUseCase };
