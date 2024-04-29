import mongoose from "mongoose";
import { ITrack } from "./interfaces";

const Schema = mongoose.Schema;

const Track = new Schema<ITrack>(
  {
    title: {
      type: String,
      required: true,
    },
    coordinates: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const trackModel = mongoose.model("track", Track);

export default trackModel;
