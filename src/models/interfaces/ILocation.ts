import { Document } from "mongoose";

export interface ILocation {
  title: string;
  coords: {
    type?: String;
    coordinates: [number, number];
  };
  userId: string;
  type: string;
  updatedAt?: string;
  createdAt?: string;
  images?: any[];
}

export interface ILocationDocument extends Document {
  title: string;
  coords: {
    type?: "Point";
    coordinates: [number, number];
  };
  userId: string;
  type: string;
  updatedAt?: string;
  createdAt?: string;
  images?: [string];
}
