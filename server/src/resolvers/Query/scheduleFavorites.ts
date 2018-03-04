import * as moment from 'moment';
import * as _sortBy from 'lodash/sortBy';
import {
  getShowById,
  getEpisodeById,
  getScheduleByDate,
  search,
  getEpisodes,
} from '../../tvmaze/api';
import { combineResults } from '../../utils';

/**
 * Check whether episode is in the future or aired in the last 3 days
 */
const isRecentOrNewEpisode = episode =>
  moment(episode.airstamp).isAfter(moment().subtract(3, 'days'));

const sortByDate = (results: any[]) => _sortBy(results, 'airstamp');

export default function scheduleFavorites(
  parent: any,
  { showIds }: { showIds: string[] },
) {
  return Promise.all(
    showIds.map(async showId => {
      let show;
      let episodes;
      try {
        show = await getShowById(showId);
        episodes = await getEpisodes(showId);
      } catch (e) {
        throw e;
      }
      return episodes.filter(isRecentOrNewEpisode).map(episode => {
        episode.show = show;
        return episode;
      });
    }),
  )
    .then(combineResults)
    .then(sortByDate);
}
