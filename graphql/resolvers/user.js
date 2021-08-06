import { registerUser, loginUser } from '../../controllers/user.js'

export default {
  Mutation: {
    // Auth: user registration
    register: async (_, { registerInput }, context, info) => {
      const result = await registerUser(registerInput)
      if (!result) {
        throw new Error('Something went wrong!')
      }

      return result
    },

    // Auth: user logging in
    login: async (_, { email, password }, context, info) => {
      const result = await loginUser(email, password)
      if (!result) {
        throw new Error('Invalid email or password.')
      }

      return result
    },
  },
}
