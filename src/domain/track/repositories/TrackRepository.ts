import { ITrack } from "../../../models/interfaces";
import TracKModel from "./../../../models/Track";
import { ITrackRepository } from "./ITrackRepository";

class TrackRepository implements ITrackRepository {
  constructor(private trackModel: typeof TracKModel) {}
  async getUserTracks(userId: string): Promise<ITrack[]> {
    return this.trackModel.find({
      userId,
    });
  }
  async storeTrack(data: ITrack): Promise<void> {
    await this.trackModel.create(data);
  }
}

export { TrackRepository };
