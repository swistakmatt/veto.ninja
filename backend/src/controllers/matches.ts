import { Request, Response } from "express";
import Match, { IMatch } from "../models/Match";
import Draft, { IDraft, GameName } from "../models/Draft";

export async function getMatches(req: Request, res: Response) {
  try {
    const matches: IMatch[] = await Match.find({});
    res.json(matches);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function getMatch(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const match: IMatch | null = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.json(match);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function createMatch(req: Request, res: Response) {
  const { gameName, result } = req.body;
  try {
    const newDraft = new Draft({
      gameName,
      teams: [
        { picks: [], bans: [], captain: null },
        { picks: [], bans: [], captain: null },
      ],
    });
    const savedDraft = await newDraft.save();

    const newMatch = new Match({
      draft: savedDraft._id,
      result,
    });
    const savedMatch = await newMatch.save();

    res.json(savedMatch);
  } catch (err) {
    res.status(500).send("Server error");
  }
}
