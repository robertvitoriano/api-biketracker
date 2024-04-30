import { ITrack } from "../../../models/interfaces";

export interface ITrackRepository {
  getUserTracks(userId: string): Promise<ITrack[]>;
  storeTrack(data: ITrack): Promise<void>;
}
