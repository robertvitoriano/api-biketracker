import { ILocation } from "../../../models/interfaces";

export interface ILocationRepository {
  storeLocation(data: ILocation): Promise<string>;
  getUserLocations(userId: string): Promise<ILocation[]>;
}
