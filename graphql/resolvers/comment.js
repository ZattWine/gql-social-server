import {
  createComment,
  deleteComment,
  reactionToPost,
} from '../../controllers/comment.js'

export default {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const post = await createComment(postId, body, context)
      if (!post) throw new Error('Error on commenting to a post.')
      return post
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const post = await deleteComment(postId, commentId, context)
      if (!post) throw new Error('Error on deleting a comment from a post.')
      return post
    },

    reactPost: async (_, { postId }, context) => {
      const post = await reactionToPost(postId, context)
      if (!post) throw new Error('Error on reacting a post.')
      return post
    },
  },
}
