import Joi from 'joi'

const body = Joi.string().required().label('Body')

export const postSchema = Joi.object({
  body,
})

export const commentSchema = Joi.object({
  body,
})
