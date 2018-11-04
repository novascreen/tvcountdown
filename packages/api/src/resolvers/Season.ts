import * as _get from 'lodash/get';
import { getSeasonEpisodes } from '../tvmaze/api';

export default {
  episodes: season => getSeasonEpisodes(season.id),
};
