export type FavoriteShow = {
  id?: string;
  tvmaze?: number;
  tvrage?: number;
  thetvdb?: number;
  imdb?: string;
};

export type User = {
  id?: string;
  email?: string;
  role?: 'ADMIN' | 'USER';
  name?: string;
  avatar?: string;
  identity?: string;
  favoriteShows?: FavoriteShow[];
};

export type Image = {
  medium?: string;
  original?: string;
};

export type Network = {
  name?: string;
};

export type WebChannel = {
  name?: string;
};

export type Schedule = {
  time?: string;
  days?: string[];
};

export type Show = {
  id: number;
  name: string;
  airedYears?: string;
  premiered?: string;
  image?: Image;
  network?: Network;
  webChannel?: WebChannel;
  summary?: string;
  runtime?: number;
  genres?: string[];
  status?: string;
  officialSite?: string;
  schedule?: Schedule;
  previousEpisode: Episode;
  nextEpisode: Episode;
};

export type Episode = {
  id: number;
  name: string;
  season?: number;
  number?: number;
  airstamp: string;
  runtime?: number;
  summary: string;
  image?: Image;
  show?: Show;
};
