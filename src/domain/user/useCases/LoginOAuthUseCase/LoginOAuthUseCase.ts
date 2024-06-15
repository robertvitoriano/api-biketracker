import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserCredentials, IUser } from "../../types";
import { generateAuthToken } from "../../../../utils";
class LoginOAuthUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(profile: any): Promise<{
    user: { email: string; name: string; username: string };
    token: string;
  }> {
    console.log({ LOGGEDIN_PROFILE_GOOGLE: profile });
    const user: IUser = await this.userRepository.findByCredentials({
      email: profile.email,
    });

    if (!user) throw new Error("Unable to login !");
    const token = await generateAuthToken(user._id);

    if (!token) throw new Error("Unable to login !");

    return {
      user: { name: user.name, email: user.email, username: user.username },
      token,
    };
  }
}

export { LoginOAuthUseCase };
