import { ITrackDTO } from "../../dto/ITrackDTO";
import { TrackRepository } from "../../repositories/TrackRepository";
import fs from "fs";
import path from "path";
class StoreNewUserTrackUseCase {
  constructor(private trackRepository: TrackRepository) {}
  async execute(data: ITrackDTO) {
    const coordinatesParsed: [[number, number]] = JSON.parse(
      String(data.coordinates)
    );
    const encoded = data.image;
    const base64ToArray = encoded.split(";base64,");
    const prefix = base64ToArray[0];
    const extension = prefix.replace(/^data:image\//, "");
    const uploadsFolderPath = "./temp/";

    if (!fs.existsSync(uploadsFolderPath)) {
      fs.mkdirSync(uploadsFolderPath);
    }
    if (extension === "jpeg" || extension === "jpg" || extension === "png") {
      const imageData = base64ToArray[1];
      const fileName = ((new Date().getTime() / 1000) | 0) + "." + extension;
      const imagePath = uploadsFolderPath + fileName;
      fs.writeFileSync(imagePath, imageData, { encoding: "base64" });
    }
    await this.trackRepository.storeTrack({
      ...data,
      distance: Number(data.distance),
      time: Number(data.time),
      path: { coordinates: coordinatesParsed },
    });
  }
}

export { StoreNewUserTrackUseCase };
