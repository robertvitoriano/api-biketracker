import path from "path";
import morgan from "morgan";
import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
dotenv.config();
import router from "./routes/router";

import "./database/connection";

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 100,
    },
  })
);

app.use(morgan(":method :url :response-time  :status"));

const allowedOrigins = [
  "http://localhost:5173",
  "https://biketracker.robertvitoriano.com",
  "https://localhost",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
// Add logging to debug environment variables
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);
console.log("Google Callback URL:", process.env.GOOGLE_CALLBACK_URL);
console.log("Client URL:", process.env.CLIENT_URL);

app.use(cors(corsOptions));

app.get("/", (request, response) => {
  response.json({
    message: "API is running !",
  });
});

app.set("views", path.join(__dirname + "/views/"));

app.set("view engine", "ejs");

app.use(express.json());

app.use(router);

// confirmEmailJob.start()
// recoverPasswordJob.start()

export default app;
