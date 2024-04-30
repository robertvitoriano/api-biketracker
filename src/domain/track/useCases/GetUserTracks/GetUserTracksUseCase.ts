import { TrackRepository } from "../../repositories/TrackRepository";

class GetUserTracksUseCase {
  constructor(private trackRepository: TrackRepository) {}
  async execute(userId: string) {
    const userTracks = this.trackRepository.getUserTracks(userId);
    return userTracks;
  }
}

export { GetUserTracksUseCase };
