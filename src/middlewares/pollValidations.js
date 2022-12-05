import dayjs from "dayjs";
import { pollSchema } from "../schemas/poll.model.js";

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