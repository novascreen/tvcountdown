import _get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import _reverse from 'lodash/reverse';
import { getShowById } from '../../tvmaze/api';
import { combineResults } from '../../utils/utils';
import { QueryResolvers } from '../../types';

const sortByDate = (results: any[]) => _sortBy(results, 'airstamp');

export const scheduleFavorites: QueryResolvers['scheduleFavorites'] = (
  parent,
  { showIds, previous = false },
) =>
  Promise.all(
    showIds.map(async showId => {
      if (!showId) return [];
      let show;
      try {
        show = await getShowById(showId);
      } catch (e) {
        throw e;
      }
      const episode = previous
        ? _get(show, '_embedded.previousepisode', null)
        : _get(show, '_embedded.nextepisode', null);

      if (!episode) return [];

      episode.show = show;
      return [episode];
    }),
  )
    .then(combineResults)
    .then(sortByDate)
    .then(results => (previous ? _reverse(results) : results));
