import { Document } from "mongoose";

export interface ITrack extends Document {
  title: string;
  path: {
    type: string;
    coordinates: Array<[number, number]>;
  };
  userId: string;
  createdAt: string;
  updatedAt?: string;
}
