import { Router } from "express";
import { getPollChoices, postChoice, postChoiceVote } from "../controllers/choice.controller";

const router = Router()

router.post("/choice", postChoice)
router.get("/poll/:id/choice", getPollChoices)
router.post("/choice/:id/vote", postChoiceVote)