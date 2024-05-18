import { Location } from "../../../../models";
import { LocationRepository } from "../LocationRepository";

const locationRepository = new LocationRepository(Location);

export { locationRepository };
