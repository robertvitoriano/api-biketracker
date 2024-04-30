import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response } from "express";
class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { name, username, email, password } = request.body;
    try {
      const createUserResponse = await this.createUserUseCase.execute({
        name,
        username,
        email,
        password,
      });
      return response.status(201).json(createUserResponse);
    } catch (error) {
      response.status(500).send({
        errrorMessage: error.message,
      });
    }
  }
}

export { CreateUserController };
