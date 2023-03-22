import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Draft from "./models/Draft";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.post("/draft", async (req: Request, res: Response) => {
  const newDraft = new Draft({
    title: req.body.title,
    content: req.body.content,
  });
  const createdDeck = await newDraft.save();
  res.json(createdDeck);
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
