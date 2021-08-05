import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    body: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const reactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const postSchema = new mongoose.Schema(
  {
    body: String,
    username: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [commentSchema],
    reactions: [reactionSchema],
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export default Post
