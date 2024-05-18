import { ILocation } from "../../../models/interfaces";
import LocationModel from "../../../models/Location";
import { ILocationRepository } from "./ILocationRepository";

class LocationRepository implements ILocationRepository {
  constructor(private locationModel: typeof LocationModel) {}
  async storeLocation(data: ILocation): Promise<void> {
    await this.locationModel.create(data);
  }
}

export { LocationRepository };
