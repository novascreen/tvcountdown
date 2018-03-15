import * as moment from 'moment';
import * as _sortBy from 'lodash/sortBy';
import * as _first from 'lodash/first';
import * as _last from 'lodash/last';
import {
  getShowById,
  getEpisodeById,
  getScheduleByDate,
  search,
  getEpisodes,
} from '../../tvmaze/api';
import { combineResults } from '../../utils';

const isRecentEpisode = episode =>
  moment(episode.airstamp).isAfter(moment().subtract(3, 'days')) &&
  moment(episode.airstamp).isBefore();

const isFutureEpisode = episode => moment(episode.airstamp).isAfter();

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
      const filteredEpisodes = [];
      const recentEpisode = _last(episodes.filter(isRecentEpisode));
      const nextEpisode = _first(episodes.filter(isFutureEpisode));
      return [recentEpisode, nextEpisode].filter(Boolean).map(episode => {
        episode.show = show;
        return episode;
      });
    }),
  )
    .then(combineResults)
    .then(sortByDate);
}
