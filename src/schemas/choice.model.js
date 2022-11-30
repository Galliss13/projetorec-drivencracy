import joi from 'joi'

export const choiceSchema = joi.object({
    title: joi.required(),
    pollId: joi.string().required()
})