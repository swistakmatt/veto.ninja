import { Request, Response } from "express";
import Draft, { IDraft } from "../models/Draft";

export async function getDrafts(req: Request, res: Response) {
  try {
    const drafts: IDraft[] = await Draft.find({});
    res.json(drafts);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function getDraft(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const draft: IDraft | null = await Draft.findById(id);
    if (!draft) {
      return res.status(404).json({ message: "Draft not found" });
    }
    res.json(draft);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function createDraft(req: Request, res: Response) {
  const { team1, team2 } = req.body;
  try {
    const newDraft = new Draft({
      team1,
      team2,
    });
    const savedDraft = await newDraft.save();
    res.json(savedDraft);
  } catch (err) {
    res.status(500).send("Server error");
  }
}
