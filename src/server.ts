import * as dotenv from 'dotenv';
dotenv.config();
import logger from 'morgan';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import { getUser } from './utils';

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({
    req: {
      headers: { token },
    },
  }) => ({
    loggedInUser: await getUser(token),
  }),
});

const app = express();
app.use(logger('tiny'));
apollo.applyMiddleware({ app });

app.listen(PORT, () =>
  console.log(`server running on port http://localhost:${PORT}/graphql `)
);
