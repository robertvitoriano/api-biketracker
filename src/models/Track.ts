import mongoose from "mongoose";
import { ITrackDocument } from "./interfaces/ITrack";

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
const TrackSchema = new Schema<ITrackDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: LineSchema,
      required: true,
    },
    time: {
      type: Number,
      required: true,
      default: 0,
    },
    distance: {
      type: Number,
      required: true,
      default: 0,
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
