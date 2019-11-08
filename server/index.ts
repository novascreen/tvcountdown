import fs from 'fs';
import path from 'path';

import { ApolloServer, AuthenticationError } from 'apollo-server-micro';
import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

import { Prisma } from './generated/prisma-client';
import resolvers from './resolvers';
import directiveResolvers from './directives';
import { AUTH_CONFIG } from './serverConstants';
import { Context, Auth0User } from 'utils/utils';
import JwksRsa from 'jwks-rsa';
import { getAuth0User } from './utils/getAuth0User';

// Ensure the file is included in ncc build
fs.readFileSync(path.join(__dirname, '/prisma.graphql'));

const isProduction = process.env.NODE_ENV === 'production';

const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 1,
  jwksUri: `https://${AUTH_CONFIG.domain}/.well-known/jwks.json`,
});

type GetKey = (
  header: { typ: string; alg: string; kid: string },
  cb: Function,
) => void;
const getKey = (header: any, cb: Function) => {
  client.getSigningKey(header.kid, function(error, key: any) {
    if (error) cb(error);
    else {
      var signingKey = key.publicKey || key.rsaPublicKey;
      cb(null, signingKey);
    }
  });
};

const options = {
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 1,
    jwksUri: `https://${AUTH_CONFIG.domain}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  credentialsRequired: false,
  audience: AUTH_CONFIG.audience,
  issuer: `https://${AUTH_CONFIG.domain}/`,
  algorithms: ['RS256'],
};

const db = new Prisma({
  // the endpoint of the Prisma DB service (value is set in .env)
  endpoint: process.env.PRISMA_ENDPOINT || '',
  // taken from database/prisma.yml (value is set in .env)
  secret: process.env.PRISMA_SECRET || '',
  // log all GraphQL queries & mutations
  debug: !isProduction,
});

const schema = makeExecutableSchema({
  typeDefs: importSchema(path.join(__dirname, '/schema.graphql')),
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
