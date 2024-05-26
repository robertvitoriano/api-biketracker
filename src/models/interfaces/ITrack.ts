import { Document } from "mongoose";

export interface ITrack {
  title: string;
  path: {
    type?: "LineString";
    coordinates: Array<[number, number]>;
  };
  time: number;
  distance: number;
  speed: number;
  userId: string;
  image: string;
  startLocationId: string;
  finishLocationId: string;
  visibility: "public" | "private";
  createdAt?: string;
  updatedAt?: string;
}

export interface ITrackDocument extends Document {
  title: string;
  path: {
    type: string;
    coordinates: Array<[number, number]>;
  };
  time: number;
  distance: number;
  speed: number;
  userId: string;
  image: string;
  startLocationId: string;
  finishLocationId: string;
  visibility: "public" | "private";
  createdAt?: string;
  updatedAt?: string;
}
