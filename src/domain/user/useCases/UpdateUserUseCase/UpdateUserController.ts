import { Response, Request } from "express";
import { UpdateUserUseCase } from "./UpdateUserCase";

class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { username, email, password, weight, avatar, name } = request.body;

    try {
      const updateUserData = await this.updateUserUseCase.execute({
        username,
        email,
        password,
        weight,
        avatar,
        name,
      });
      return response.status(201).json(updateUserData);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        errorMessage: error.message,
      });
    }
  }
}

export { UpdateUserController };
