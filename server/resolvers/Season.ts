import { getSeasonEpisodes } from '../tvmaze/api';
import { SeasonResolvers } from '../types';

const Season: SeasonResolvers = {
  episodes: season => (season.id ? getSeasonEpisodes(season.id) : null),
};

export default Season;
