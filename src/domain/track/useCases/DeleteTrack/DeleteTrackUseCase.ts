import { LocationRepository } from "../../../location/repositories/LocationRepository";
import { TrackRepository } from "../../repositories/TrackRepository";

class DeleteTrackUseCase {
  constructor(
    private trackRepository: TrackRepository,
    private locationRepository: LocationRepository
  ) {}
  async execute(userId: string, trackId: string) {
    const trackLocationIds = await this.trackRepository.getTrackLocationIds({
      trackId,
      userId,
    });
    await this.trackRepository.deleteTrack({
      trackId,
      userId,
    });

    for (const locationId of trackLocationIds) {
      await this.locationRepository.deleteLocation(locationId);
    }
  }
}

export { DeleteTrackUseCase };
