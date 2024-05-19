import { ITrack } from "../../../models/interfaces";
import TracKModel from "./../../../models/Track";
import { ITrackRepository, IUserStatistics } from "./ITrackRepository";

class TrackRepository implements ITrackRepository {
  constructor(private trackModel: typeof TracKModel) {}

  async getUserStatistics(userId: string): Promise<IUserStatistics> {
    const aggregationResult = await this.trackModel.aggregate([
      {
        $match: { userId },
      },
      {
        $group: {
          _id: null,
          totalOfTracks: { $sum: 1 },
          totalTime: { $sum: "$time" },
          totalDistance: { $sum: "$distance" },
        },
      },
      {
        $project: {
          _id: 0,
          totalOfTracks: 1,
          totalTime: 1,
          totalDistance: 1,
        },
      },
    ]);
    const userStatistics =
      aggregationResult.length > 0 ? aggregationResult[0] : null;

    return userStatistics;
  }

  async getUserTracks(userId: string): Promise<ITrack[]> {
    return this.trackModel
      .find({
        userId,
      })
      .select({
        _id: 1,
        title: 1,
        coordinates: "$path.coordinates",
        time: 1,
        distance: 1,
        image: 1,
        createdAt: 1,
      });
  }
  async storeTrack(data: ITrack): Promise<void> {
    await this.trackModel.create(data);
  }
  async deleteTrack({ trackId, userId }): Promise<void> {
    await this.trackModel.findOneAndDelete({ _id: trackId, userId });
  }
  async getTrackLocationIds({ trackId, userId }): Promise<string[]> {
    const { startLocationId, finishLocationId } = await this.trackModel
      .find({ _id: trackId, userId })
      .select({ finishLocationId: 1, startLocationId: 1 });

    return [startLocationId, finishLocationId];
  }
}

export { TrackRepository };
