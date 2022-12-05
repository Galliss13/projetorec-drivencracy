import { ObjectId } from "mongodb";
import { choiceCollection } from "../database/db.js";

export async function voteExistenceValidation (req, res, next) {
    const {id} = req.params
    try {
        const voteChoice = await choiceCollection.findOne({_id: ObjectId(id)})
        if (!voteChoice) {
            return res.sendStatus(404)
        }
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
    next()
}