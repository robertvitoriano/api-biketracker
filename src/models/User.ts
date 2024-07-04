import mongoose from "mongoose";
import validator from "validator";
import { IUserModel } from "./interfaces";

const userSchema = new mongoose.Schema<IUserModel>(
  {
    avatar: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: false,
    },
    weight: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
