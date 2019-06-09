import { getShowById } from '../../tvmaze/api';
import { combineResults } from '../../utils';
import { QueryShowsArgs } from '../../types';

export default function(parent, { ids }: QueryShowsArgs) {
  return Promise.all(
    ids.map(async showId => {
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
}
