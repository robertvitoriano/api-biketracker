import { generateAuthToken } from "../../../../utils";
import { UserRepository } from "../../repositories/UserRepository";
import axios from "axios";
import { IUser } from "../../types";

class LoginAndroidOAuthUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute({
    googleToken,
  }: any): Promise<{ user: IUser; token: string }> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleToken}`
      );

      if (response.status === 200) {
        const data = response.data;

        const { email, name, picture } = data;

        let user = await this.userRepository.findByCredentials({ email });

        if (!user) {
          user = await this.userRepository.createUser({
            email,
            name,
            avatar: picture,
            username: email.split("@")[0],
          });
        }

        const authToken = await generateAuthToken(user._id);

        if (!authToken) throw new Error("Unable to login!");
        return {
          user,
          token: authToken,
        };
      } else {
        console.log("Token is invalid or expired:", response.statusText);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }
}

export { LoginAndroidOAuthUseCase };
