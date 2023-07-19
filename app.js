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
  mongoose
    .connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Connected to MongoDB Database")
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});