import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ITrackDTO } from "../../dto/ITrackDTO";
import { TrackRepository } from "../../repositories/TrackRepository";
import fs from "fs";
import path from "path";
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");
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
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.S3_REGION;
    const Bucket = process.env.S3_BUCKET;

    if (extension === "jpeg" || extension === "jpg" || extension === "png") {
      const imageData = base64ToArray[1];
      const fileName = ((new Date().getTime() / 1000) | 0) + "." + extension;
      console.log({
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
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

      await this.trackRepository.storeTrack({
        ...data,
        distance: Number(data.distance),
        time: Number(data.time),
        path: { coordinates: coordinatesParsed },
        image: `https://${Bucket}/${s3Key}`,
      });
    } else {
      console.error("Unsupported image format");
      // Handle unsupported image format
    }
  }
}

export { StoreNewUserTrackUseCase };
