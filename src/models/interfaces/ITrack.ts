import { Document } from "mongoose";

export interface ITrack extends Document {
  title: string;
  coordinates: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
}
