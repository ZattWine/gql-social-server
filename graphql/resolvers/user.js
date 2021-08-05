import { registerUser } from '../../controllers/user.js'

export default {
  Mutation: {
    register: async (_, { registerInput }, context, info) => {
      const result = await registerUser(registerInput)
      if (!result) {
        throw new Error('Something went wrong!')
      }

      return result
    },
  },
}
