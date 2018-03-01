import * as R from 'ramda';
import * as _get from 'lodash/get';
import * as moment from 'moment';
import validateAndParseIdToken from '../helpers/validateAndParseIdToken';

import { Context, combineResults } from '../utils';
import {
  getShowById,
  getEpisodeById,
  getScheduleByDate,
  search,
  getEpisodes,
} from '../tvmaze/api';
import scheduleFavorites from './scheduleFavorites';

type Parent = any;

async function createPrismaUser(ctx: any, idToken: any) {
  const user = await ctx.db.mutation.createUser({
    data: {
      identity: idToken.sub.split(`|`)[0],
      auth0id: idToken.sub.split(`|`)[1],
      name: idToken.name,
      email: idToken.email,
      avatar: idToken.picture,
    },
  });
  return user;
}

const ctxUser = ctx => ctx.request.user;

const eqIdAirstamp = (a, b) =>
  R.eqProps('id', a, b) && R.eqProps('airstamp', a, b);

/**
 * Check whether episode is in the future or aired in the last 3 days
 */
const isRecentOrNewEpisode = episode =>
  moment(episode.airstamp).isAfter(moment().subtract(3, 'days'));

export default {
  Query: {
    me(parent: Parent, args: any, ctx: any, info: any) {
      return ctx.db.query.user({ where: { id: ctxUser(ctx).id } }, info);
    },
    search(parent: Parent, { query }: { query: string }) {
      return search(query);
    },
    show(parent: Parent, { id }: { id: string }) {
      return getShowById(id);
    },
    scheduleByDate(parent: Parent, { date }: { date: string }) {
      const dates = date.split(',');
      if (dates.length > 1) {
        return (
          Promise.all(dates.map(d => getScheduleByDate(d)))
            .then(combineResults)
            // Filter duplicates (midnight episodes)
            .then(results => R.uniqWith(eqIdAirstamp, results))
        );
      }
      return getScheduleByDate(date);
    },
    scheduleFavorites,
    episode(parent: Parent, { id }: { id: string }) {
      return getEpisodeById(id);
    },
  },
  Mutation: {
    async authenticate(
      parent: Parent,
      { idToken }: { idToken: any },
      ctx: any,
      info: any,
    ) {
      let userToken = null;
      try {
        userToken = await validateAndParseIdToken(idToken);
      } catch (err) {
        throw new Error(err.message);
      }
      const auth0id = userToken.sub.split('|')[1];
      let user = await ctx.db.query.user({ where: { auth0id } }, info);
      if (!user) {
        user = createPrismaUser(ctx, userToken);
      }
      return user;
    },
  },
  Show: {
    airedYears: show => {
      const fromYear = _get((show.premiered || '').split('-'), [0], '');
      const previousEpisode = _get(show, '_embedded.previousepisode', null);
      let toYear = '';
      if (previousEpisode && show.status === 'Ended') {
        toYear = _get((previousEpisode.airdate || '').split('-'), [0], '');
      }
      return `${fromYear}–${toYear}`;
    },
    previousEpisode: show => _get(show, '_embedded.previousepisode', null),
    nextEpisode: show => _get(show, '_embedded.nextepisode', null),
  },
  Episode: {
    show: episode => episode.show || _get(episode, '_embedded.show', null),
  },
};
