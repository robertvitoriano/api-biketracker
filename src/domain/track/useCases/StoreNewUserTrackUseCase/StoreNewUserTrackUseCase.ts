import { ITrackDTO } from "../../dto/ITrackDTO";
import { TrackRepository } from "../../repositories/TrackRepository";

class StoreNewUserTrackUseCase {
  constructor(private trackRepository: TrackRepository) {}
  async execute(data: ITrackDTO) {
    await this.trackRepository.storeTrack({
      ...data,
      path: { coordinates: data.coordinates },
    });
  }
}

export { StoreNewUserTrackUseCase };
