import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { GameName } from "../models/Draft";
import { getMatches, getMatch, createMatch } from "../controllers/matches";

const express = require("express");
const router = express.Router();

const handleErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get("/", getMatches);
router.get("/:id", getMatch);

router.post(
  "/",
  [
    check("gameName")
      .isIn(Object.values(GameName))
      .withMessage("Invalid or missing gameName"),
    check("result").optional().notEmpty().withMessage("Result cannot be empty"),
  ],
  handleErrors,
  createMatch
);

export default router;
