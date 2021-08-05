import { getPosts } from '../../controllers/post.js'

export default {
  Query: {
    getPosts: async () => {
      try {
        const posts = await getPosts()
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
