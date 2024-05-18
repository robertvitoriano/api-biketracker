import { ILocationDTO } from "../../dto/ILocationDTO";
import { LocationRepository } from "../../repositories/LocationRepository";

class StoreLocationUseCase {
  constructor(private locationRepository: LocationRepository) {}
  async execute({ coordinates, ...rest }: ILocationDTO) {
    const coords = {
      type: "Point",
      coordinates,
    };
    await this.locationRepository.storeLocation({ ...rest, coords });
  }
}
export { StoreLocationUseCase };
