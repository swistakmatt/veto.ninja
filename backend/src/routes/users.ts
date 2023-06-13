import passport from "passport";
import { check, validationResult } from "express-validator";

import {
  handleErrors,
  createUser,
  getUsers,
  getUser,
  loginUser,
  logoutUser,
  getProfile,
  getUserFriends,
  addFriend,
} from "../controllers/users";

const express = require("express");
const router = express.Router();

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

router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  loginUser
);

router.get("/logout", logoutUser);
router.get("/me", getProfile);
router.post("/me/friends", addFriend);
router.get("/friends", getUserFriends);
router.get("/", getUsers);
router.get("/:id", getUser);

export default router;
