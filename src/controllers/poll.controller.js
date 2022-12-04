import { ObjectId } from "mongodb"
import { choiceCollection, pollCollection } from "../database/db.js"


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
    try {
        const poll = await pollCollection.findOne({_id: ObjectId(id)})
        const pollChoices = await choiceCollection.find({pollId: id}).toArray()

        const choice = choiceWithMoreVotes(pollChoices)

        return res.status(200).send({
            _id: ObjectId(id),
            title: poll.title,
            expireAt: poll.expireAt,
            result: {
                title
            }
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }

    async function choiceWithMoreVotes(choiceArray) {
        let numberVotes
        let bestChoice
        choiceArray.forEach(choice => {
            
        });
    }

}

//{
//	_id: "54759eb3c090d83494e2d222",
//	title: "Qual a sua linguagem de programação favorita?"
//	expireAt: "2022-02-14 01:00",
//	result : {
//		title: "Javascript",
//		votes: 487
//	}
//}