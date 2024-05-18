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
    type: Array,
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
      type: Array,
      required: false,
    },
    type: {
      type: String,
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
  },
  { timestamps: true }
);
LocationSchema.index({ coords: "2dsphere" });

const LocationModel = mongoose.model("Location", LocationSchema);

export default LocationModel;
