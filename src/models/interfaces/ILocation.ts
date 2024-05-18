import { Document } from "mongoose";

export interface ILocation {
  title: string;
  coords: {
    type?: String;
    coordinates: [number, number];
  };
  userId: string;
  type: "generic" | "track-finish" | "track-start";
  updatedAt?: string;
  createdAt?: string;
  visibility?: "public" | "private";
  images?: any[];
}

export interface ILocationDocument extends Document {
  title: string;
  coords: {
    type?: "Point";
    coordinates: [number, number];
  };
  userId: string;
  type: "generic" | "track-finish" | "track-start";
  updatedAt?: string;
  createdAt?: string;
  visibility: "public" | "private";
  images?: [string];
}
