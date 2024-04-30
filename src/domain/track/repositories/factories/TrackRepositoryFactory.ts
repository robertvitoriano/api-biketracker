import { Track } from "../../../../models";
import { TrackRepository } from "../TrackRepository";

const trackRepository = new TrackRepository(Track);

export { trackRepository };
