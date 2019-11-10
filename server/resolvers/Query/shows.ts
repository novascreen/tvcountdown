import { getShowById } from '../../tvmaze/api';
import { combineResults } from '../../utils/utils';
import { QueryResolvers } from '../../types';

export const shows: QueryResolvers['shows'] = (parent, { ids }) =>
  Promise.all(
    ids.map(async showId => {
      if (!showId) return [];
      let show;
      try {
        show = await getShowById(showId);
        if (show) return [show];
      } catch (e) {
        throw e;
      }
      return [];
    }),
  ).then(combineResults);
