import { ObjectId } from "mongodb";
import { choiceCollection, voteCollection } from "../database/db.js"

export async function postChoice(req, res) {
    const choice = res.locals.choice
    try {
        await choiceCollection.insertOne(choice)
        res.status(201).send(choice.title)
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}

export async function getPollChoices(req, res) {
    const {id} = req.params
    try {
        const pollChoices = await choiceCollection.find({pollId: id}).toArray()
        if (!pollChoices) {
            return res.sendStatus(404)
        }
        return res.status(200).send(pollChoices)
    } catch(err) {
        console.log(err);
        return res.sendStatus(500)
    }
}

export async function postChoiceVote(req, res) {
    const {id} = req.params
    try {
        await voteCollection.insertOne({
            createdAt:'DATA QUE FOI CRIADO',
            choiceId: id
        })
        res.sendStatus(201)
    } catch(err) {
        console.log(err);
        return res.sendStatus(500)
    }
}