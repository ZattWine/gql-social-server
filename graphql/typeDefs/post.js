import { gql } from 'apollo-server'

export default gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getPosts: [Post]
    getPostById(postId: ID!): Post
  }

  type Mutation {
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
`
