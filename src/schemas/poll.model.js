import joi from 'joi'

export const pollSchema = joi.object({
    title: joi.required(),
    expireAt: joi.required()
})