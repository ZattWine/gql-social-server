import { AuthenticationError } from 'apollo-server'

import Post from '../models/postModel.js'
import { commentSchema } from '../graphql/schemas/post.js'
import { isAuth } from '../helpers/checkAuth.js'

/**
 * Create a comment.
 */
const createComment = async (postId, body, context) => {
  // check auth
  const user = await isAuth(context)

  // validate input
  await commentSchema.validateAsync({ body })

  // check post is existed
  const post = await Post.findById(postId)
  if (!post) {
    throw new Error('Post not found.')
  }

  // prepare comment schema
  const comment = {
    body,
    user: user.id,
    username: user.username,
  }

  // unshift to comment array
  post.comments.unshift(comment)

  // save document
  await post.save()

  return post
}

/**
 * Delete a comment.
 */
const deleteComment = async (postId, commentId, context) => {
  // check auth
  const user = await isAuth(context)

  const post = await Post.findById(postId)
  if (!post) {
    throw new Error('Post not found.')
  }

  const commentIdx = post.comments.findIndex((c) => c.id === commentId)
  if (commentIdx < 0) throw new Error('Comment not found.')

  if (
    post.comments[commentIdx].user.toString() === user.id.toString() ||
    post.user.toString() === user.id.toString()
  ) {
    post.comments.splice(commentIdx, 1)
    await post.save()
    return post
  } else {
    throw new AuthenticationError('Action is not allowed.')
  }
}

/**
 * Like a post.
 */
const reactionToPost = async (postId, context) => {
  // check auth
  const user = await isAuth(context)

  const post = await Post.findById(postId)
  if (!post) throw new Error('Post not found.')

  const alreadyReact = post.reactions.find(
    (r) => r.user.toString() === user.id.toString()
  )
  if (alreadyReact) {
    // remove react to a post
    post.reactions = post.reactions.filter(
      (r) => r.user.toString() !== user.id.toString()
    )
  } else {
    // add react to a post
    const reaction = {
      username: user.username,
      user: user.id,
    }
    post.reactions.push(reaction)
  }

  await post.save()
  return post
}

export { createComment, deleteComment, reactionToPost }
