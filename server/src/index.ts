import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import * as R from 'ramda';
import _get from 'lodash/get';

import { Prisma } from './generated/prisma';
import { Context } from './utils';
import { getShowById, getScheduleByDate, search } from './tvmaze/api';

type Parent = any;

const eqIdAirstamp = (a, b) => R.eqProps('id', a, b) && R.eqProps('airstamp', a, b);

const resolvers = {
  Query: {
    search(parent: Parent, { query }: { query: String }) {
      return search(query);
    },
    show(parent: Parent, { id }: { id: String }) {
      return getShowById(id);
    },
    scheduleByDate(parent: Parent, { date }: { date: String }) {
      const dates = date.split(',');
      if (dates.length > 1) {
        return Promise.all(dates.map(d => getScheduleByDate(d)))
          .then(results => results.reduce((a, b) => a.concat(b), []))
          // Filter duplicates (midnight episodes)
          .then(results => R.uniqWith(eqIdAirstamp, results));
      }
      return getScheduleByDate(date);
    }
  },
  Show: {
    previousEpisode: (show) => _get(show, '_embedded.previousepisode', null),
    nextEpisode: (show) => _get(show, '_embedded.nextepisode', null),
  }
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
