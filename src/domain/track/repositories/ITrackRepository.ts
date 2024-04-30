import { ITrack } from "../../../models/interfaces";
import { ITrackDTO } from "../dto/ITrackDTO";

export interface ITrackRepository {
  getUserTracks(userId: string): Promise<ITrack[]>;
  storeTrack(data: ITrackDTO): Promise<void>;
}
