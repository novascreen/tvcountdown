import { GraphQLServer } from 'graphql-yoga';
import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';
import { Prisma } from './generated/prisma';
import resolvers from './resolvers';
import checkJwt from './middleware/checkJwt';
import getUser from './middleware/getUser';
import directiveResolvers from './directives';

const isProduction = process.env.NODE_ENV === 'production';

const db = new Prisma({
  // the endpoint of the Prisma DB service (value is set in .env)
  endpoint: process.env.PRISMA_ENDPOINT,
  // taken from database/prisma.yml (value is set in .env)
  secret: process.env.PRISMA_SECRET,
  // log all GraphQL queries & mutations
  debug: !isProduction,
});

const schema = makeExecutableSchema({
  typeDefs: importSchema('./src/schema.graphql'),
  resolvers,
  directiveResolvers,
});

const server = new GraphQLServer({
  schema,
  context: req => ({
    ...req,
    db,
  }),
});

server.express.post(
  server.options.endpoint,
  checkJwt,
  (err, req, res, next) => {
    if (err) {
      console.error(err);
      return res.status(401).send(err.message);
    }
    next();
  },
);
server.express.post(server.options.endpoint, (req, res, next) =>
  getUser(req, res, next, db),
);

server.start(
  {
    playground: isProduction ? false : '/',
    port: parseInt(process.env.PORT, 10) || 4000,
  },
  () => console.log('Server is running on http://localhost:4000'),
);
