require("dotenv").config();

import mongoose from "mongoose";
import { Request, Response } from "express";
import configureExpressMiddlewares from "./middlewares";

import userRoutes from "./routes/users";
import draftRoutes from "./routes/drafts";
import matchRoutes from "./routes/matches";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

configureExpressMiddlewares(app);

app.use("/users", userRoutes);
app.use("/matches", matchRoutes);
app.use("/drafts", draftRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the eSport Drafts API!");
});

mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost:2137")
  .then(() => {
    console.log(`App is listening on port: ${PORT}`);
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
