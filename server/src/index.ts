import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import { Prisma } from './generated/prisma';
import { Context } from './utils';
import { getShowById, getScheduleByDate, search } from './tvmaze/api';

type Parent = any;

const resolvers = {
  Query: {
    search(parent: Parent, { query }: { query: String }) {
      return search(query);
    },
    show(parent: Parent, { id }: { id: String }) {
      return getShowById(id);
    },
    scheduleByDate(parent: Parent, { date }: { date: String }) {
      return getScheduleByDate(date);
    }
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: 'https://us1.prisma.sh/public-branchchopper-936/server/dev', // the endpoint of the Prisma DB service
      secret: 'mysecret123', // specified in database/prisma.yml
      debug: true, // log all GraphQL queries & mutations
    }),
  }),
});

// tslint:disable-next-line no-console
server.start(() => console.log('Server is running on http://localhost:4000'));
