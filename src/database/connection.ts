import mongoose from "mongoose";
import { Track } from "../models";
import { Location } from "../models";
mongoose.set("useCreateIndex", true);
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
  },
  () => {
    console.log("Im connected to mongodb");
  }
);

export { Track, Location };
