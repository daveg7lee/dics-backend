import * as dotenv from 'dotenv';
dotenv.config();
import logger from 'morgan';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import { getUser } from './utils';

const PORT = process.env.PORT || 4000;

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => ({
    loggedInUser: await getUser(req.headers.token),
  }),
});

const app: any = express();
app.use(logger('tiny'));
apollo.applyMiddleware({ app });

app.listen(PORT, () =>
  console.log(`server running on port http://localhost:${PORT}/graphql `)
);
