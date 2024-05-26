import { StoreNewUserTrackUseCase } from "./StoreNewUserTrackUseCase";
import { Request, Response } from "express";
class StoreNewUserTrackController {
  constructor(private storeNewUserUseCase: StoreNewUserTrackUseCase) {}

  async handle(request: Request, response: Response) {
    const {
      coordinates,
      title,
      time,
      distance,
      image,
      startLocationTitle,
      finishLocationTitle,
      visibility,
      speed,
    } = request.body;
    const { _id: userId } = request.user;
    try {
      const createNewUserTrackResponse = await this.storeNewUserUseCase.execute(
        {
          title,
          coordinates,
          userId,
          time,
          distance,
          image,
          finishLocationTitle,
          startLocationTitle,
          visibility,
          speed,
        }
      );
      return response.status(201).json(createNewUserTrackResponse);
    } catch (error) {
      console.error(error);
      response.status(500).send({
        errrorMessage: error.message,
      });
    }
  }
}

export { StoreNewUserTrackController };
