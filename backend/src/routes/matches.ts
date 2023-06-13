import { Router } from "express";
import {
  createMatch,
  getMatch,
  getUserHistory,
  getUserHistoryWithUsernames,
} from "../controllers/matches";

const router = Router();

router.post("/create", createMatch);
router.get("/:id", getMatch);
router.get("/history/:id", getUserHistory);
router.get("/history/:id/usernames", getUserHistoryWithUsernames);

export default router;
