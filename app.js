import {} from "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { db_username, db_password, db_cluster, db_name, server_port } from "./config/setup.js";
import AuthRouter from "./routes/AuthRouter.js";
import TasksRouter from "./routes/TasksRouter.js";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/tasks", TasksRouter);

if (process.env.NODE_ENV !== 'prod') {
  mongoose
    .connect(`mongodb+srv://${db_username}:${db_password}@${db_cluster}.mongodb.net/${db_name}?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Connected to MongoDB Database")
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
}

app.listen(server_port, () => {
  console.log(`Server is running on port ${server_port}`);
});