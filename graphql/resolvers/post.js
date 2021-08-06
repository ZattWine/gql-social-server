import { PubSub } from 'graphql-subscriptions';

import {
  getPosts,
  getPostById,
  createPost,
  deletePost,
} from '../../controllers/post.js';

const pubsub = new PubSub();

export default {
  Post: {
    reactionCount: (parent) => parent.reactions.length,
    commentCount: (parent) => parent.comments.length,
  },

  Query: {
    getPosts: async () => {
      const posts = await getPosts();
      if (!posts) {
        throw new Error('Error on fetching posts.');
      }
      return posts;
    },

    getPostById: async (_, { postId }) => {
      const post = await getPostById(postId);
      if (!post) {
        throw new Error('Post not found.');
      }
      return post;
    },
  },

  Mutation: {
    createPost: async (_, { body }, context) => {
      const post = await createPost(body, context);
      if (!post) {
        throw new Error('Error on creating post.');
      }
      // subscription
      pubsub.publish('POST_CREATED', { postCreated: post });

      return post;
    },

    deletePost: async (_, { postId }, context) => {
      const result = await deletePost(postId, context);
      if (!result) {
        throw new Error('Error on deleting post.');
      }
      return result;
    },
  },

  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
    },
  },
};
