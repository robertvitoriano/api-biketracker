import { TrackRepository } from "../../repositories/TrackRepository";

class GetUserStatisticsUseCase {
  constructor(private trackRepository: TrackRepository) {}
  async execute(userId: string) {
    const userTracks = await this.trackRepository.getUserStatistics(
      String(userId)
    );
    return userTracks;
  }
}

export { GetUserStatisticsUseCase };
