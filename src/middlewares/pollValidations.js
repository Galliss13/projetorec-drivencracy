import dayjs from "dayjs";
import { pollSchema } from "../schemas/poll.model.js";
import { ObjectId } from "mongodb";
import { choiceCollection, voteCollection} from "../database/db.js";

export function pollSchemaValidation (req, res, next) {
    const poll = req.body
    const { error } = pollSchema.validate( poll, {abortEarly: false})
    if (error) {
        const errors = error.details.map(detail => detail.message)
        return res.status(400).send(errors)
    }
    if (poll.title.length === 0) {
        return res.sendStatus(422)
    }
    
    if (poll.expireAt.length === 0) {
        poll.expireAt = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm')
    }
    res.locals.poll = poll
    next()
}

export async function choiceWithMoreVotes(req, res, next) {
    const {id} = req.params
    let numberVotes = 0
    let bestChoice
    try {

        let cont = 0
        const pollChoices = await choiceCollection.find({pollId: id}).toArray()

        pollChoices.forEach(async choice => {
            const choiceVotes = await voteCollection.find({choiceId: ObjectId(choice._id).toString()}).toArray()
            cont += 1

            //verifica se o número de votos da escolha é maior que um anterior
            if (choiceVotes.length > numberVotes) {
                numberVotes = choiceVotes.length
                bestChoice = choice.title
            }
            //se chega ao final da pollChoices, decide o vencedor e envia para o controller
            if (cont === pollChoices.length) {
                const winner = {
                    title: bestChoice,
                    votes: numberVotes
                }
                
                res.locals.winner = winner
        
                next()
            }
        })


    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }

}
