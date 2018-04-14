import { getShowById } from '../../tvmaze/api';
import { combineResults } from '../../utils';

export default function(parent: any, { ids }: { ids: [string] }) {
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
