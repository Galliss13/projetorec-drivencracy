import { ObjectId } from "mongodb";
import { choiceCollection, pollCollection } from "../database/db.js";
import { choiceSchema } from "../schemas/choice.model.js";

export function choiceSchemaValidation (req, res, next) {
    const choice = req.body
    const {error} = choiceSchema.validate(choice, {abortEarly:'false'})
    if (error) {
        const errors = error.details.map(detail => detail.message)
        return res.status(400).send(errors)
    }
    if (choice.title.length === 0) {
        return res.sendStatus(422)
    } 
    res.locals.choice = choice
    next()
}

export async function choiceExistenceValidation (req, res, next) {
    const choice = res.locals.choice
    try {
        //verifica se a poll existe
        const pollExists = await pollCollection.findOne({_id: ObjectId(choice.pollId)})
        if (!pollExists) {
            return res.sendStatus(404)
        }

        //verifica se há outra choice de mesmo título
        const titleAlreadyExist = await choiceCollection.findOne({title: choice.title, 
            pollId: choice.pollId})
        if (titleAlreadyExist) {
            return res.sendStatus(409)
        }
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}
