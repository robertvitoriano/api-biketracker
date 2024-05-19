import { DeleteTrackUseCase } from "./DeleteTrackUseCase";
import { Request, Response } from "express";
class DeleteTrackController {
  constructor(private deleteTrackUseCase: DeleteTrackUseCase) {}

  async handle(request: Request, response: Response) {
    const { _id: userId } = request.user;
    try {
      const { trackId } = request.params;
      await this.deleteTrackUseCase.execute(userId, trackId);
      return response
        .status(200)
        .json({ message: "Track successfully deleted" });
    } catch (error) {
      response.status(500).send({
        errrorMessage: error.message,
      });
    }
  }
}

export { DeleteTrackController };
