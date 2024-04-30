import { Document } from "mongoose";

export interface ITrack extends Document {
  title: string;
  path: Array<{
    type: string;
    coordinates: [number, number];
  }>;
  userId: string;
  createdAt: string;
  updatedAt?: string;
}
