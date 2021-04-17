import * as dotenv from 'dotenv';
dotenv.config();
import logger from 'morgan';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { isAuthenticated } from './middlewares';
import { authenticateJwt } from './passport';
import { typeDefs, resolvers } from './schema';

const PORT = process.env.PORT || 4000;

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  playground: true,
  introspection: true,
  context: ({ req }) => ({ req, isAuthenticated }),
});

const app: any = express();
app.use(logger('tiny'));
app.use(authenticateJwt);
apollo.applyMiddleware({ app });

app.listen(PORT, () =>
  console.log(`server running on port http://localhost:${PORT}/graphql `)
);
