import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserCredentials, IUser } from "../../types";
import { generateAuthToken } from "../../../../utils";
class LoginOAuthUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(profile: any): Promise<{
    user: { email: string; name: string; username: string };
    token: string;
  }> {
    const { name, email, picture } = profile._json;

    let user: IUser = await this.userRepository.findByCredentials({
      email: email,
    });

    if (!user) {
      user = await this.userRepository.createUser({
        email,
        name,
        avatar: picture,
        username: email.split("@")[0],
      });
    }
    const token = await generateAuthToken(user._id);

    if (!token) throw new Error("Unable to login !");

    return {
      user: { name: user.name, email: user.email, username: user.username },
      token,
    };
  }
}

export { LoginOAuthUseCase };
