import mongoose from "mongoose";
import { ITrack } from "./interfaces";

const Schema = mongoose.Schema;

const PointSchema = new Schema({
  type: {
    type: String,
    default: "Point",
    required: true,
  },
  coordinates: {
    type: [Number, Number],
    required: true,
  },
});
const TrackSchema = new Schema<ITrack>(
  {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: [PointSchema],
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
TrackSchema.index({ path: "2dsphere" });

const trackModel = mongoose.model("track", TrackSchema);

export default trackModel;
