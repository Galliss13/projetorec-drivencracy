import { Router } from "express";
import { postPoll, getPolls, getResultPoll } from "../controllers/poll.controller.js";
import { pollSchemaValidation } from "../middlewares/pollValidations.js";
const router = Router()

router.post("/poll",pollSchemaValidation, postPoll)
router.get("/poll", getPolls)
router.get("/poll/:id/result", getResultPoll)

export default router