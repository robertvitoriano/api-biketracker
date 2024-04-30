import { UserRepository } from "../../repositories/UserRepository";
import { generateAuthToken } from "./../../../../utils";
import { encodePassword } from "./../../../../utils";

class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({ name, username, email, password }) {
    const userExists = !!(await this.userRepository.findByCredentials({
      email,
    }));

    if (userExists) throw new Error("Email not available !");
    const encodedPassword = await encodePassword(password);

    const user = await this.userRepository.createUser({
      username,
      name,
      email,
      password: encodedPassword,
    });

    const token = await generateAuthToken(user._id.toString());

    if (!token) throw new Error("Unable to create user !");

    return {
      token,
      user,
    };
  }
}

export { CreateUserUseCase };
