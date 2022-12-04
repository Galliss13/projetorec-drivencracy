import { Router } from "express";
import { getPollChoices, postChoice, postChoiceVote } from "../controllers/choice.controller.js";
import {choiceSchemaValidation,  choiceExistenceValidation} from "../middlewares/choiceValidations.js";
import { voteExistenceValidation } from "../middlewares/voteValidations.js";

const router = Router()

router.post("/choice", choiceSchemaValidation, choiceExistenceValidation, postChoice)
router.get("/poll/:id/choice", getPollChoices)
router.post("/choice/:id/vote", voteExistenceValidation, postChoiceVote)

export default router