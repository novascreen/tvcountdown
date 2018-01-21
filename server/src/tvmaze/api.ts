import fetch from 'node-fetch';

const BASE_URL = 'http://api.tvmaze.com';
const COUNTRYCODE = 'US';

const getJSON = res => res.json();

export const search = (query: String) => (
  fetch(`${BASE_URL}/search/shows?q=${query}`)
    .then(getJSON)
    .then(results => results.map(result => result.show))
    .catch(console.error)
);

export const getShowById = (id: String) => (
  fetch(`${BASE_URL}/shows/${id}`).then(getJSON).catch(console.error)
);

export const getEpisodes = (showId: String) => (
  fetch(`${BASE_URL}/shows/${showId}/episodes`).then(getJSON).catch(console.error)
);

export const getScheduleByDate = (
  date: String,
  country: String = COUNTRYCODE) => (
  fetch(`${BASE_URL}/schedule?country=${country}&date=${date}`).then(getJSON).catch(console.error)
);
