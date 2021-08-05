import Joi from 'joi'

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username')
const email = Joi.string().email().required().label('Email')
const password = Joi.string()
  .min(8)
  .max(50)
  //   .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/)
  .label('Password')
//   .options({
//     language: {
//       string: {
//         regex: {
//           base: 'must have at least one letter, one lowercase letter, one uppercase letter and one digit.',
//         },
//       },
//     },
//   })
const confirmPassword = Joi.ref('password')

export const registerSchema = Joi.object({
  username,
  email,
  password,
  confirmPassword,
})

export const loginSchema = Joi.object({
  email,
  password,
})
