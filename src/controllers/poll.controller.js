import { pollCollection } from "../database/db.js"


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

}