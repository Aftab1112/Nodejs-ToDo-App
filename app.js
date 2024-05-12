import express from "express";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

// Creating a basic express server
export const app = express();

// Using dotenv config file to hide port and database uri
config({
  path: "./data/config.env",
});

// Using a middleware to get req data from body
app.use(express.json());

// Using a middleware to get token from cookie
app.use(cookieParser());

// Using a middleware to allow a specific domain and api requests
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using router from routes file
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

// Render home page
app.get("/", (req, res) => {
  res.send("Nice Working");
});

// Using an error handler middleware
app.use(errorMiddleware);
