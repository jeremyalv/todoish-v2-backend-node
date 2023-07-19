import {} from "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import AuthRouter from "./routes/AuthRouter.js";
import TasksRouter from "./routes/TasksRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/tasks", TasksRouter);

if (process.env.NODE_ENV !== 'prod') {
  mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@sandbox.v4wi8gu.mongodb.net/?retryWrites=true&w=majority`)
}

const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to MongoDB Database"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});