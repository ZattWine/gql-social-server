import { ApolloServer } from 'apollo-server'
import { gql } from 'apollo-server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import typeDefs from './graphql/typeDefs/index.js'
import resolvers from './graphql/resolvers/index.js'

dotenv.config()

const port = process.env.PORT || 5000
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database connected.')
    return server.listen({ port })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
  .catch((error) => console.log(error))
