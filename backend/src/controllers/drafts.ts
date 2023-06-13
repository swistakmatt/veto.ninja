import { Request, Response } from "express";
import Draft from "../models/Draft";

export const createDraft = async (req: Request, res: Response) => {
  const draft = new Draft(req.body);
  try {
    await draft.save();
    res.status(201).send(draft);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getDraft = async (req: Request, res: Response) => {
  try {
    const draft = await Draft.findById(req.params.id);
    if (!draft) {
      return res.status(404).send();
    }
    res.send(draft);
  } catch (e) {
    res.status(500).send();
  }
};
