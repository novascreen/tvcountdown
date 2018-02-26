import * as R from 'ramda';
import * as _get from 'lodash/get';

import { Context } from './utils';
import {
  getShowById,
  getEpisodeById,
  getScheduleByDate,
  search,
} from './tvmaze/api';

type Parent = any;

const eqIdAirstamp = (a, b) =>
  R.eqProps('id', a, b) && R.eqProps('airstamp', a, b);

export default {
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
        return (
          Promise.all(dates.map(d => getScheduleByDate(d)))
            .then(results => results.reduce((a, b) => a.concat(b), []))
            // Filter duplicates (midnight episodes)
            .then(results => R.uniqWith(eqIdAirstamp, results))
        );
      }
      return getScheduleByDate(date);
    },
    episode(parent: Parent, { id }: { id: String }) {
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
