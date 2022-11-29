import { Router } from "express";
import { postPoll, getPolls, getResultPoll } from "../controllers/poll.controller";
const router = Router()

router.post("/poll", postPoll)
router.get("/poll", getPolls)
router.get("/poll/:id/result", getResultPoll)