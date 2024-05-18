import mongoose from "mongoose";
import { ILocationDocument } from "./interfaces/ILocation";

const Schema = mongoose.Schema;

const CoordinatesSchema = new Schema({
  type: {
    type: String,
    default: "Point",
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});
const LocationSchema = new Schema<ILocationDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    type: {
      type: String,
      enum: ["generic", "track-finish", "track-start"],
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    coords: {
      type: CoordinatesSchema,
      required: true,
    },
    visibility: {
      type: String,
      required: false,
      default: "public",
    },
  },
  { timestamps: true }
);
LocationSchema.index({ coords: "2dsphere" });

const LocationModel = mongoose.model("Location", LocationSchema);

export default LocationModel;
