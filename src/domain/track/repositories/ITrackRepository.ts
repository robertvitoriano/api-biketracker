import { ITrack } from "../../../models/interfaces";
export interface IUserStatistics {
  tracksRun: string;
  time: string;
  distance: string;
}
export interface ITrackRepository {
  getUserTracks(userId: string): Promise<ITrack[]>;
  storeTrack(data: ITrack): Promise<void>;
  getUserStatistics(userId: string): Promise<IUserStatistics>;
}
