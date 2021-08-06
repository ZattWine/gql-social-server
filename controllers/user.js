import User from '../models/userModel.js'
import { registerSchema, loginSchema } from '../graphql/schemas/user.js'
import { generateJwtToken } from '../helpers/generateToken.js'

/**
 * Register user.
 */
const registerUser = async ({ username, email, password, confirmPassword }) => {
  // validate inputs
  await registerSchema.validateAsync({
    username,
    email,
    password,
    confirmPassword,
  })

  // check user is already exists
  const existUser = await User.findOne({ email })
  if (existUser) {
    throw new Error('User already exists.')
  }

  const user = await User.create({
    username,
    email,
    password,
  })
  if (!user) {
    throw new Error('Invalid user data.')
  }

  return {
    ...user._doc,
    id: user._id,
    token: generateJwtToken(user._id),
  }
}

/**
 * Log in user.
 */
const loginUser = async (email, password) => {
  // validate inputs
  await loginSchema.validateAsync({
    email,
    password,
  })

  // check user exists or password matching
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    return {
      ...user._doc,
      id: user._id,
      token: generateJwtToken(user._id),
    }
  } else {
    throw new Error('Invalid email or password.')
  }
}

export { registerUser, loginUser }
