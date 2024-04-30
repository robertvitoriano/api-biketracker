import mongoose from "mongoose";
import { ITrack } from "./interfaces";

const Schema = mongoose.Schema;

const LineSchema = new Schema({
  type: {
    type: String,
    default: "LineString",
    required: true,
  },
  coordinates: {
    type: Array,
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
      type: LineSchema,
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
