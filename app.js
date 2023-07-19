import {} from "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import AuthRouter from "./routes/AuthRouter";
import SubscriptionRouter from "./routes/SubscriptionRouter";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", AuthRouter);
app.use("/", SubscriptionRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})