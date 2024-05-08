import { ITrackDTO } from "../../dto/ITrackDTO";
import { TrackRepository } from "../../repositories/TrackRepository";

class StoreNewUserTrackUseCase {
  constructor(private trackRepository: TrackRepository) {}
  async execute(data: ITrackDTO) {
    const coordinatesParsed: [[number, number]] = JSON.parse(
      String(data.coordinates)
    );
    await this.trackRepository.storeTrack({
      ...data,
      distance: Number(data.distance),
      time: Number(data.time),
      path: { coordinates: coordinatesParsed },
    });
  }
}

export { StoreNewUserTrackUseCase };
