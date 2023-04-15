import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
} from "../controllers/users";

const express = require("express");
const router = express.Router();

const handleErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Must be a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  handleErrors,
  createUser
);

router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;
