import { GetLocationsUseCase } from "./GetLocationsUseCase";
import { Request, Response } from "express";
class GetLocationsController {
  constructor(private getLocationsUseCaseUseCase: GetLocationsUseCase) {}

  async handle(request: Request, response: Response) {
    const { _id: userId } = request.user;
    try {
      const createLocationResponse =
        await this.getLocationsUseCaseUseCase.execute(userId);
      return response.status(201).json(createLocationResponse);
    } catch (error) {
      response.status(500).send({
        errrorMessage: error.message,
      });
    }
  }
}

export { GetLocationsController };
