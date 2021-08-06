import 'dotenv/config'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'

import typeDefs from './graphql/typeDefs/index.js'
import resolvers from './graphql/resolvers/index.js'

const port = process.env.PORT || 5000

async function startApolloServer() {
  // setting up apollo server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  })
  await apolloServer.start()

  // express
  const app = express()

  // disable showing X-Powered-By content
  app.disable('x-powered-by')
  // Cross-Origin-Resource-Sharing
  app.use(cors())
  app.use(bodyParser.json())

  apolloServer.applyMiddleware({ app, path: '/' })

  await new Promise((resolve) => app.listen({ port }, resolve))
  console.log(
    `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  )
  return {
    apolloServer,
    app,
  }
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.info(`🚀 Database ready.`)
    return startApolloServer()
  })
  .catch((err) => console.log(err))
