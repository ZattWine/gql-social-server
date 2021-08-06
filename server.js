import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

import typeDefs from './graphql/typeDefs/index.js';
import resolvers from './graphql/resolvers/index.js';

const port = process.env.PORT || 5000;

(async () => {
  // database connect
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(`🚀  Database ready.`);

  const app = express();
  const httpServer = createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: httpServer, path: apolloServer.graphqlPath }
  );

  httpServer.listen(port, () => {
    console.log(
      `🚀  Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
    );
  });
})();

// const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => ({ req, pubsub }),
// })

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.info(`🚀 Database ready.`)
//     return apolloServer.listen({ port })
//   })
//   .then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`)
//   })
