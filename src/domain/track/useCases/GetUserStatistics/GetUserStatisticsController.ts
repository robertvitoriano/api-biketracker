import { GetUserStatisticsUseCase } from "./GetUserStatisticsUseCase";
import { Request, Response } from "express";
class GetUserTracksController {
  constructor(private getUserStatisticsUseCase: GetUserStatisticsUseCase) {}

  async handle(request: Request, response: Response) {
    const { _id: userId } = request.user;
    try {
      const getUserTracksResponse = await this.getUserStatisticsUseCase.execute(
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
