import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';

import { Prisma } from './generated/prisma';
import resolvers from './resolvers';
import directiveResolvers from './directives';
import checkJwt from './middleware/jwt';
import getUser from './middleware/getUser';

const db = new Prisma({
  endpoint: 'https://us1.prisma.sh/public-branchchopper-936/server/dev', // the endpoint of the Prisma DB service
  secret: 'mysecret123', // specified in database/prisma.yml
  debug: true, // log all GraphQL queries & mutations
});

const schema = makeExecutableSchema({
  typeDefs: importSchema('./src/schema.graphql'),
  resolvers,
  directiveResolvers,
});

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
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

// tslint:disable-next-line no-console
server.start(() => console.log('Server is running on http://localhost:4000'));
