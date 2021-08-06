import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'

import User from '../models/userModel.js'

const isAuth = async ({ req }) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1]
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select('-password')
        return user
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token.')
      }
    }
    throw new AuthenticationError(
      `Authentication token must be 'Bearer [token]'.`
    )
  }
  throw new AuthenticationError(`Authorization header must be provided.`)
}

export { isAuth }
