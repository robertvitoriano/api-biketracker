import { StoreLocationUseCase } from "./StoreLocationUseCase";
import { Request, Response } from "express";
class StoreLocationController {
  constructor(private storeLocationUseCase: StoreLocationUseCase) {}

  async handle(request: Request, response: Response) {
    const { coordinates, title, type } = request.body;
    const { _id: userId } = request.user;
    const coordinatesParsed = JSON.parse(String(coordinates));
    try {
      const createLocationResponse = await this.storeLocationUseCase.execute({
        title,
        coordinates: coordinatesParsed,
        userId,
        type,
      });
      return response.status(201).json(createLocationResponse);
    } catch (error) {
      response.status(500).send({
        errrorMessage: error.message,
      });
    }
  }
}

export { StoreLocationController };
