import { Document } from "mongoose";

export interface ITrack {
  title: string;
  path: {
    type?: "LineString";
    coordinates: Array<[number, number]>;
  };
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITrackDocument extends Document {
  title: string;
  path: {
    type: string;
    coordinates: Array<[number, number]>;
  };
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
