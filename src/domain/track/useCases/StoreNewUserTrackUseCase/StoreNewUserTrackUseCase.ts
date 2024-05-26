import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ITrackDTO } from "../../dto/ITrackDTO";
import { TrackRepository } from "../../repositories/TrackRepository";
import fs from "fs";
import path from "path";
import { LocationRepository } from "../../../location/repositories/LocationRepository";
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");
class StoreNewUserTrackUseCase {
  constructor(
    private trackRepository: TrackRepository,
    private locationRepository: LocationRepository
  ) {}
  async execute(data: ITrackDTO) {
    const coordinatesParsed: [[number, number]] = JSON.parse(
      String(data.coordinates)
    );
    const encoded = data.image;
    const base64ToArray = encoded.split(";base64,");
    const prefix = base64ToArray[0];
    const extension = prefix.replace(/^data:image\//, "");
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.S3_REGION;
    const Bucket = process.env.S3_BUCKET;
    const { startLocationTitle, finishLocationTitle } = data;
    if (extension === "jpeg" || extension === "jpg" || extension === "png") {
      const imageData = base64ToArray[1];
      const fileName = ((new Date().getTime() / 1000) | 0) + "." + extension;
      const s3Key = `track-images/${fileName}`;

      const s3Client = new S3Client({
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
        region,
      });

      const params = {
        ACL: "public-read",
        Bucket,
        Key: s3Key,
        Body: Buffer.from(imageData, "base64"),
        ContentDisposition: "attachment",
      };
      try {
        //@ts-ignore
        await s3Client.send(new PutObjectCommand(params));
      } catch (error) {
        console.error("Error uploading image to S3:", error);
        throw error;
      }
      const startLocationId = await this.locationRepository.storeLocation({
        title: startLocationTitle,
        coords: { coordinates: coordinatesParsed[0], type: "Point" },
        visibility: data.visibility,
        type: "track-start",
        userId: data.userId,
      });

      const finishLocationId = await this.locationRepository.storeLocation({
        title: finishLocationTitle,
        visibility: data.visibility,
        coords: {
          coordinates: coordinatesParsed[coordinatesParsed.length - 1],
          type: "Point",
        },
        type: "track-finish",
        userId: data.userId,
      });

      await this.trackRepository.storeTrack({
        ...data,
        distance: Number(data.distance),
        time: Number(data.time),
        speed: Number(data.speed),
        path: { coordinates: coordinatesParsed },
        image: `https://${Bucket}.s3.amazonaws.com/${s3Key}`,
        startLocationId,
        finishLocationId,
      });
    } else {
      console.error("Unsupported image format");
      // Handle unsupported image format
    }
  }
}

export { StoreNewUserTrackUseCase };
