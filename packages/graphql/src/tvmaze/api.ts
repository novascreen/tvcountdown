import fetch from 'node-fetch';
import * as memoize from 'memoizee';

const BASE_URL = 'http://api.tvmaze.com';
const COUNTRYCODE = 'US';

const getJSON = res => res.json();

const hours = (h: number = 1): number => h * 60 * 60 * 1000;

const CACHE_HOURS = 6;

export const search = memoize(
  (query: string) =>
    fetch(`${BASE_URL}/search/shows?q=${query}`)
      .then(getJSON)
      .then(results => results.map(result => result.show))
      .catch(console.error),
  { maxAge: hours(CACHE_HOURS) },
);

export const getShowById = memoize(
  (id: string) =>
    fetch(`${BASE_URL}/shows/${id}?embed[]=previousepisode&embed[]=nextepisode`)
      .then(getJSON)
      .catch(console.error),
  { maxAge: hours(CACHE_HOURS) },
);

export const getEpisodeById = memoize(
  (id: string) =>
    fetch(`${BASE_URL}/episodes/${id}?embed=show`)
      .then(getJSON)
      .catch(console.error),
  { maxAge: hours(CACHE_HOURS) },
);

export const getShowEpisodes = memoize(
  (showId: string) =>
    fetch(`${BASE_URL}/shows/${showId}/episodes?specials=1`)
      .then(getJSON)
      .catch(console.error),
  { maxAge: hours(CACHE_HOURS) },
);

export const getShowSeasons = memoize(
  (showId: string) =>
    fetch(`${BASE_URL}/shows/${showId}/seasons`)
      .then(getJSON)
      .catch(console.error),
  { maxAge: hours(CACHE_HOURS) },
);

export const getSeasonEpisodes = memoize(
  (seasonId: string) =>
    fetch(`${BASE_URL}/seasons/${seasonId}/episodes?specials=1`)
      .then(getJSON)
      .catch(console.error),
  { maxAge: hours(CACHE_HOURS) },
);

export const getScheduleByDate = (
  date: string,
  country: string = COUNTRYCODE,
) =>
  fetch(`${BASE_URL}/schedule?country=${country}&date=${date}`)
    .then(getJSON)
    .catch(console.error);
