import UserModel from "./../../../models/User";
import { IUserRepository } from "./IUserRepository";
import { IUser, IUserCredentials } from "./../types";
class UserRepository implements IUserRepository {
  constructor(private userModel: typeof UserModel) {}

  async update(data: any): Promise<IUser> {
    const user = await this.userModel.findOneAndUpdate(
      {
        email: data.email,
      },
      {
        ...data,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );

    await user.save();
    return user;
  }
  public async createUser({ username, name, email, password }): Promise<IUser> {
    if (password) {
      const user = await this.userModel.create({
        username,
        name,
        email,
        password,
      });
      return user;
    }
    const user = await this.userModel.create({
      username,
      name,
      email,
    });
    return user;
  }

  public async findByCredentials({
    email,
    username,
  }: IUserCredentials): Promise<IUser> {
    let user = null;

    if (email) {
      user = await this.userModel
        .findOne({
          email,
        })
        .select({
          name: 1,
          username: 1,
          email: 1,
          password: 1,
        });
    }
    if (username) {
      user = await this.userModel.findOne({
        username,
      });
    }

    return user;
  }
}

export { UserRepository };
