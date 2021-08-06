import { AuthenticationError } from 'apollo-server'

import Post from '../models/postModel.js'
import { isAuth } from '../helpers/checkAuth.js'
import { postSchema } from '../graphql/schemas/post.js'

/**
 * Fetch all posts.
 */
const getPosts = async () => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 })
    return posts
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Fetch single post by postId.
 */
const getPostById = async (postId) => {
  const post = await Post.findById(postId)
  if (!post) {
    throw new Error('Post not found.')
  }
  return post
}

/**
 * Ceate a new post.
 */
const createPost = async (body, context) => {
  // check auth
  const user = await isAuth(context)

  // validate inputs
  await postSchema.validateAsync({
    body,
  })

  const post = await Post.create({
    body,
    user: user.id,
    username: user.username,
  })
  if (!post) {
    throw new Error('Error on creating post.')
  }
  return post
}

/**
 * Delete a post.
 */
const deletePost = async (postId, context) => {
  // check auth
  const user = await isAuth(context)

  const post = await Post.findById(postId)
  if (!post) {
    throw new Error('Post not found.')
  }

  if (user.username !== post.username) {
    throw new AuthenticationError('Action not allowed.')
  }

  await post.remove()
  return 'Deleted post successfully.'
}

export { getPosts, getPostById, createPost, deletePost }
