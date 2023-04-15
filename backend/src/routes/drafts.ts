import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { getDrafts, getDraft, createDraft } from "../controllers/drafts";

const express = require("express");
const router = express.Router();

const handleErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get("/", getDrafts);
router.get("/:id", getDraft);

router.post(
  "/",
  [
    check("team1.captain").notEmpty().withMessage("Team 1 captain is required"),
    check("team2.captain").notEmpty().withMessage("Team 2 captain is required"),
  ],
  handleErrors,
  createDraft
);

export default router;
