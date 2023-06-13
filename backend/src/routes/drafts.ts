import { Router } from "express";
import { createDraft, getDraft } from "../controllers/drafts";

const router = Router();

router.post("/create", createDraft);
router.get("/:id", getDraft);

export default router;
