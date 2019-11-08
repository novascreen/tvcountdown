import { ApolloServer, AuthenticationError } from 'apollo-server-micro';
import { makeExecutableSchema } from 'graphql-tools';

import { Prisma } from './generated/prisma-client';
import resolvers from './resolvers';
import directiveResolvers from './directives';
import { Context } from 'utils/utils';
import { getAuth0User } from './utils/getAuth0User';
import { typeDefs } from './typeDefs';

const isProduction = process.env.NODE_ENV === 'production';

const db = new Prisma({
  // the endpoint of the Prisma DB service (value is set in .env)
  endpoint: process.env.PRISMA_ENDPOINT || '',
  // taken from database/prisma.yml (value is set in .env)
  secret: process.env.PRISMA_SECRET || '',
  // log all GraphQL queries & mutations
  debug: !isProduction,
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers,
} as any);

const server = new ApolloServer({
  schema,
  context: async ({ req }): Promise<Context> => {
    const authorization = req.headers.authorization || '';
    const [, token] = authorization.split(' ');
    const auth0User = await getAuth0User(token);
    const user: Context['user'] = await new Promise((resolve, reject) => {
      if (!auth0User) resolve();
      db.user({ auth0id: auth0User.id })
        .then(resolve)
        .catch(() => {
          throw new AuthenticationError('User not found');
        });
    });
    return {
      user,
      auth0User,
      db,
    };
  },
  introspection: true,
  playground: true,
});

export default server.createHandler({ path: '/api' });
