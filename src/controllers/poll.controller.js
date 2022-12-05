import { ObjectId } from "mongodb"
import { choiceCollection, pollCollection, voteCollection } from "../database/db.js"


export async function postPoll(req, res) {
    const poll = res.locals.poll
    try {
        await pollCollection.insertOne(poll)
        return res.sendStatus(201)
    } catch(err) {
        console.log(err)
        return res.sendStatus(500)
    }

} 

export async function getPolls(req, res) {
    try {
        const polls = await pollCollection.find().toArray()
        return res.status(200).send(polls)
    } catch(err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function getResultPoll(req, res) {
    const {id} = req.params
    const winner = res.locals.winner
    try {
        const poll = await pollCollection.findOne({_id: ObjectId(id)})

        return res.status(200).send({
            _id: ObjectId(id),
            title: poll.title,
            expireAt: poll.expireAt,
            result: winner
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }


}

