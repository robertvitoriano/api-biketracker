import { GetProfileUseCase } from "./GetProfileUseCase";
import { Request, Response } from "express";
class GetProfileController {
  constructor(private getProfileUseCase: GetProfileUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const getProfileResponse = await this.getProfileUseCase.execute(
        request.user
      );
      return response.status(201).json(getProfileResponse);
    } catch (error) {
      response.status(500).send({
        errrorMessage: error.message,
      });
    }
  }
}

export { GetProfileController };
