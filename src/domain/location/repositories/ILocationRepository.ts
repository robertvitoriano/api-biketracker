import { ILocation } from "../../../models/interfaces";

export interface ILocationRepository {
  storeLocation(data: ILocation): Promise<void>;
}
