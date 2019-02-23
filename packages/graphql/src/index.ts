require('dotenv').config();

import * as fs from 'fs';
import * as path from 'path';

import { ApolloServer, gql } from "apollo-server-express";
import * as express from "express";
import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';

import { Prisma } from './generated/prisma-client';
import { Context } from './utils'
import resolvers from './resolvers';
import checkJwt from './middleware/checkJwt';
import getUser from './middleware/getUser';
import directiveResolvers from './directives';

// Ensure the file is included in ncc build
fs.readFileSync(path.join(__dirname, "/prisma.graphql"))

const typeDefs = importSchema(path.join(__dirname, "/schema.graphql"));

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
  typeDefs,
  resolvers,
  directiveResolvers,
});

const server = new ApolloServer({
  schema,
  context: req => ({
    ...req,
    db,
  }),
  introspection: true,
  playground: true,
})

const app = express()
const {PORT = 4000} = process.env

const endpoint = '/graphql';

app.post(
  endpoint,
  checkJwt,
  (err, req, res, next) => {
    if (err) {
      console.error(err);
      return res.status(401).send(err.message);
    }
    next();
  },
);

app.post(endpoint, (req, res, next) =>
  getUser(req, res, next, db),
);

server.applyMiddleware({ app })

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

export default app
