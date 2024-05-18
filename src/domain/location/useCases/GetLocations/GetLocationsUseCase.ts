import { LocationRepository } from "../../repositories/LocationRepository";

class GetLocationsUseCase {
  constructor(private locationRepository: LocationRepository) {}
  async execute(userId: string) {
    const userLocations = await this.locationRepository.getUserLocations(
      userId
    );

    return userLocations;
  }
}
export { GetLocationsUseCase };
