import * as dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server-fastify';
import { typeDefs, resolvers } from './schema';
import { getUser } from './utils';
import fastify from 'fastify';

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  playground: true,
  introspection: true,
  context: async ({
    request: {
      headers: { token },
    },
  }) => ({
    loggedInUser: await getUser(token),
  }),
});

const app = fastify({
  logger: {
    level: 'info',
  },
});
app.register(apollo.createHandler());

app.listen(PORT, () =>
  console.log(`server running on port http://localhost:${PORT}/graphql `)
);
