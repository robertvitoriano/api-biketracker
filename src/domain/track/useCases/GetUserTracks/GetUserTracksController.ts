import { GetUserTracksUseCase } from "./GetUserTracksUseCase";
import { Request, Response } from "express";
class GetUserTracksController {
  constructor(private getUserTracksUseCase: GetUserTracksUseCase) {}

  async handle(request: Request, response: Response) {
    const { _id: userId } = request.user;
    try {
      const getUserTracksResponse = await this.getUserTracksUseCase.execute(
        userId
      );
      return response.status(200).json(getUserTracksResponse);
    } catch (error) {
      response.status(500).send({
        errrorMessage: error.message,
      });
    }
  }
}

export { GetUserTracksController };
