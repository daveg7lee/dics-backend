import * as dotenv from 'dotenv';
dotenv.config();
import { GraphQLServer } from 'graphql-yoga';
import * as logger from 'morgan';
import { isAuthenticated } from './middlewares';
import schema from './schema';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.express.use(logger('dev'));

server.start({ port: PORT }, () =>
  console.log(`server running on port http://localhost:${PORT} `)
);
