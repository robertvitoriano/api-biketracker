import { ILocation } from "../../../models/interfaces";
import LocationModel from "../../../models/Location";
import { ILocationRepository } from "./ILocationRepository";

class LocationRepository implements ILocationRepository {
  constructor(private locationModel: typeof LocationModel) {}
  async getUserLocations(userId): Promise<ILocation[]> {
    const locations = await this.locationModel
      .find({
        userId,
        visibility: "public",
      })
      .select({
        _id: 1,
        title: 1,
        coordinates: "$coords.coordinates",
        images: 1,
        userId: 1,
        createdAt: 1,
        visibility: 1,
        type: 1,
      });
    return locations;
  }

  async storeLocation(data: ILocation): Promise<string> {
    const { _id: locationId } = await this.locationModel.create(data);
    return locationId;
  }
  async deleteLocation(locationId): Promise<void> {
    await this.locationModel.deleteMany([]);
  }
}

export { LocationRepository };
