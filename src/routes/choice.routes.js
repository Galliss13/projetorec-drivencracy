import { Router } from "express";
import { getPollChoices, postChoice, postChoiceVote } from "../controllers/choice.controller.js";

const router = Router()

router.post("/choice", postChoice)
router.get("/poll/:id/choice", getPollChoices)
router.post("/choice/:id/vote", postChoiceVote)

export default router