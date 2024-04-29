import { Document } from "mongoose";

export interface IUserModel extends Document {
  username: string;
  confirmed: Boolean;
  name: string;
  email: string;
  receivedEmail: boolean;
  emailAttempts?: number;
  password: string;
  createdAt: string;
  updatedAt?: string;
  isRecoveringPassword: boolean;
}
