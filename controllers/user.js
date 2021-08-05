import User from '../models/userModel.js'
import { generateJwtToken } from '../helpers/generateToken.js'

/**
 * Register user.
 *
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns
 */
const registerUser = async ({ username, email, password, confirmPassword }) => {
  // validate inputs

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

export { registerUser }
