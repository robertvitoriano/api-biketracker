import UserModel from "./../../../models/User";
import { IUserRepository } from "./IUserRepository";
import { IUser, IUserCredentials } from "./../types";

class UserRepository implements IUserRepository {
  constructor(private userModel: typeof UserModel) {}

  async update(data: any): Promise<IUser> {
    const updateData: any = {};

    for (const key in data) {
      if (data[key] !== undefined) {
        updateData[key] = data[key];
      }
    }

    const user = await this.userModel.findOneAndUpdate(
      {
        email: data.email,
      },
      {
        $set: updateData,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );

    return user;
  }

  public async createUser({
    username,
    avatar,
    name,
    email,
    password = null,
  }): Promise<IUser> {
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
      avatar,
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
