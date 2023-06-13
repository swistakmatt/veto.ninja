import { Request, Response } from "express";
import Match, { IMatch } from "../models/Match";
import Draft from "../models/Draft";
import mongoose from "mongoose";

export const createMatch = async (req: Request, res: Response) => {
  const match = new Match(req.body);
  try {
    await match.save();
    res.status(201).send(match);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getMatch = async (req: Request, res: Response) => {
  try {
    const match = await Match.findById(req.params.id).populate("draft");
    if (!match) {
      return res.status(404).send();
    }
    res.send(match);
  } catch (e) {
    res.status(500).send();
  }
};

export const getUserHistory = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "User id is required." });
  }

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user id." });
  }

  try {
    const matches = await Match.find()
      .populate({
        path: "draft",
        match: {
          $or: [{ "teams.user": id }],
        },
        model: Draft,
      })
      .exec();

    const filteredMatches = matches.filter((match) => match.draft !== null);

    if (!filteredMatches.length) {
      return res
        .status(404)
        .json({ message: "No matches found for the given user id." });
    }

    return res.json(filteredMatches);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

export const getUserHistoryWithUsernames = async (
  req: Request,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "User id is required." });
  }

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user id." });
  }

  try {
    const matches = await Match.find()
      .populate({
        path: "draft",
        model: Draft,
        populate: [
          {
            path: "teams.user",
            model: "User",
            select: "username -_id",
          },
          {
            path: "startingUser",
            model: "User",
            select: "username -_id",
          },
        ],
      })
      .exec();

    const filteredMatches = matches.filter((match) => match.draft !== null);

    if (!filteredMatches.length) {
      return res
        .status(404)
        .json({ message: "No matches found for the given user id." });
    }

    return res.json(filteredMatches);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};
