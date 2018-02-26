import * as R from 'ramda';
import * as _get from 'lodash/get';
import * as moment from 'moment';

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

const eqIdAirstamp = (a, b) =>
  R.eqProps('id', a, b) && R.eqProps('airstamp', a, b);

/**
 * Check whether episode is in the future or aired in the last 3 days
 */
const isRecentOrNewEpisode = episode =>
  moment(episode.airstamp).isAfter(moment().subtract(3, 'days'));

export default {
  Query: {
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
