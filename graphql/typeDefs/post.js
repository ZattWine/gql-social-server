import { gql } from 'apollo-server-express'

export default gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    comments: [Comment]!
    reactions: [Reaction]!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
    updatedAt: String!
  }

  type Reaction {
    id: ID!
    username: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]
    getPostById(postId: ID!): Post
  }

  type Mutation {
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    reactPost(postId: ID!): Post!
  }

  type Subscription {
    postCreated: Post!
  }
`
