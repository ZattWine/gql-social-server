import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import typeDefs from './graphql/typeDefs/index.js'
import resolvers from './graphql/resolvers/index.js'

dotenv.config()

const port = process.env.PORT || 5000
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
})

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('🚀  Database ready.')
    return server.listen({ port })
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
  .catch((error) => console.log(error))
