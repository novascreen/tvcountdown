export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};



export type Country = {
   __typename?: 'Country',
  name?: Maybe<Scalars['String']>,
  code?: Maybe<Scalars['String']>,
  timezone?: Maybe<Scalars['String']>,
};

export type Episode = {
   __typename?: 'Episode',
  id?: Maybe<Scalars['Int']>,
  url?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  season?: Maybe<Scalars['Int']>,
  number?: Maybe<Scalars['Int']>,
  airdate?: Maybe<Scalars['String']>,
  airtime?: Maybe<Scalars['String']>,
  airstamp?: Maybe<Scalars['String']>,
  runtime?: Maybe<Scalars['Int']>,
  image?: Maybe<Image>,
  summary?: Maybe<Scalars['String']>,
  show?: Maybe<Show>,
};

export type Externals = {
   __typename?: 'Externals',
  tvrage?: Maybe<Scalars['Int']>,
  thetvdb?: Maybe<Scalars['Int']>,
  imdb?: Maybe<Scalars['String']>,
};

export type FavoriteShow = {
   __typename?: 'FavoriteShow',
  id: Scalars['ID'],
  tvmaze: Scalars['Int'],
  tvrage?: Maybe<Scalars['Int']>,
  thetvdb?: Maybe<Scalars['Int']>,
  imdb?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};

export type Image = {
   __typename?: 'Image',
  medium?: Maybe<Scalars['String']>,
  original?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  authenticate?: Maybe<User>,
  createFavoriteShow?: Maybe<User>,
  deleteFavoriteShow?: Maybe<User>,
};


export type MutationAuthenticateArgs = {
  idToken: Scalars['String']
};


export type MutationCreateFavoriteShowArgs = {
  tvmaze: Scalars['Int']
};


export type MutationDeleteFavoriteShowArgs = {
  id: Scalars['ID']
};

export type Network = {
   __typename?: 'Network',
  id?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  country?: Maybe<Country>,
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  search?: Maybe<Array<Maybe<Show>>>,
  show?: Maybe<Show>,
  shows?: Maybe<Array<Maybe<Show>>>,
  scheduleAll?: Maybe<Array<Maybe<Episode>>>,
  scheduleByDate?: Maybe<Array<Maybe<Episode>>>,
  scheduleFavorites?: Maybe<Array<Maybe<Episode>>>,
  episode?: Maybe<Episode>,
  episodes?: Maybe<Array<Maybe<Episode>>>,
};


export type QuerySearchArgs = {
  query: Scalars['String']
};


export type QueryShowArgs = {
  id: Scalars['Int']
};


export type QueryShowsArgs = {
  ids: Array<Maybe<Scalars['Int']>>
};


export type QueryScheduleAllArgs = {
  previous?: Maybe<Scalars['Boolean']>
};


export type QueryScheduleByDateArgs = {
  date: Scalars['String']
};


export type QueryScheduleFavoritesArgs = {
  showIds: Array<Maybe<Scalars['Int']>>,
  previous?: Maybe<Scalars['Boolean']>
};


export type QueryEpisodeArgs = {
  id: Scalars['Int']
};


export type QueryEpisodesArgs = {
  showId: Scalars['Int']
};

export type Rating = {
   __typename?: 'Rating',
  Rating?: Maybe<Scalars['Int']>,
};

export type Schedule = {
   __typename?: 'Schedule',
  time?: Maybe<Scalars['String']>,
  days?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type Season = {
   __typename?: 'Season',
  id?: Maybe<Scalars['Int']>,
  url?: Maybe<Scalars['String']>,
  number?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  episodeOrder?: Maybe<Scalars['Int']>,
  premiereDate?: Maybe<Scalars['String']>,
  endDate?: Maybe<Scalars['String']>,
  network?: Maybe<Network>,
  webChannel?: Maybe<WebChannel>,
  image?: Maybe<Image>,
  summary?: Maybe<Scalars['String']>,
  episodes?: Maybe<Array<Maybe<Episode>>>,
};

export type Show = {
   __typename?: 'Show',
  id?: Maybe<Scalars['Int']>,
  url?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  airedYears?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  language?: Maybe<Scalars['String']>,
  genres?: Maybe<Array<Maybe<Scalars['String']>>>,
  status?: Maybe<Scalars['String']>,
  officialSite?: Maybe<Scalars['String']>,
  runtime?: Maybe<Scalars['Int']>,
  premiered?: Maybe<Scalars['String']>,
  schedule?: Maybe<Schedule>,
  rating?: Maybe<Rating>,
  weight?: Maybe<Scalars['Int']>,
  network?: Maybe<Network>,
  webChannel?: Maybe<WebChannel>,
  externals?: Maybe<Externals>,
  image?: Maybe<Image>,
  summary?: Maybe<Scalars['String']>,
  updated?: Maybe<Scalars['Int']>,
  seasons?: Maybe<Array<Maybe<Season>>>,
  episodes?: Maybe<Array<Maybe<Episode>>>,
  previousEpisode?: Maybe<Episode>,
  nextEpisode?: Maybe<Episode>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  avatar?: Maybe<Scalars['String']>,
  identity?: Maybe<Scalars['String']>,
  favoriteShows: Array<FavoriteShow>,
};

export type WebChannel = {
   __typename?: 'WebChannel',
  id?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  country?: Maybe<Country>,
};

export type GetEpisodeQueryVariables = {
  episodeId: Scalars['Int']
};


export type GetEpisodeQuery = (
  { __typename?: 'Query' }
  & { episode: Maybe<(
    { __typename?: 'Episode' }
    & Pick<Episode, 'id' | 'name' | 'summary' | 'season' | 'number' | 'airstamp' | 'runtime'>
    & { image: Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'medium'>
    )>, show: Maybe<(
      { __typename?: 'Show' }
      & Pick<Show, 'id' | 'name' | 'airedYears' | 'genres'>
    )> }
  )> }
);

export type GetShowQueryVariables = {
  showId: Scalars['Int']
};


export type GetShowQuery = (
  { __typename?: 'Query' }
  & { show: Maybe<(
    { __typename?: 'Show' }
    & Pick<Show, 'id' | 'name' | 'airedYears' | 'summary' | 'runtime' | 'genres' | 'status' | 'officialSite'>
    & { image: Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'medium'>
    )>, network: Maybe<(
      { __typename?: 'Network' }
      & Pick<Network, 'name'>
    )>, webChannel: Maybe<(
      { __typename?: 'WebChannel' }
      & Pick<WebChannel, 'name'>
    )>, schedule: Maybe<(
      { __typename?: 'Schedule' }
      & Pick<Schedule, 'time' | 'days'>
    )>, previousEpisode: Maybe<(
      { __typename?: 'Episode' }
      & Pick<Episode, 'id' | 'name' | 'airstamp' | 'season' | 'number' | 'summary'>
    )>, nextEpisode: Maybe<(
      { __typename?: 'Episode' }
      & Pick<Episode, 'id' | 'name' | 'airstamp' | 'season' | 'number' | 'summary'>
    )> }
  )> }
);

export type GetScheduleAllQueryVariables = {
  previous: Scalars['Boolean']
};


export type GetScheduleAllQuery = (
  { __typename?: 'Query' }
  & { scheduleAll: Maybe<Array<Maybe<(
    { __typename?: 'Episode' }
    & Pick<Episode, 'id' | 'name' | 'season' | 'number' | 'airstamp'>
    & { show: Maybe<(
      { __typename?: 'Show' }
      & Pick<Show, 'id' | 'name'>
      & { image: Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'medium'>
      )> }
    )> }
  )>>> }
);

export type GetScheduleFavoritesQueryVariables = {
  showIds: Array<Maybe<Scalars['Int']>>,
  previous?: Maybe<Scalars['Boolean']>
};


export type GetScheduleFavoritesQuery = (
  { __typename?: 'Query' }
  & { scheduleFavorites: Maybe<Array<Maybe<(
    { __typename?: 'Episode' }
    & Pick<Episode, 'id' | 'name' | 'season' | 'number' | 'airstamp'>
    & { show: Maybe<(
      { __typename?: 'Show' }
      & Pick<Show, 'id' | 'name'>
      & { image: Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'medium'>
      )> }
    )> }
  )>>> }
);

export type CreateFavoriteShowMutationVariables = {
  tvmaze: Scalars['Int']
};


export type CreateFavoriteShowMutation = (
  { __typename?: 'Mutation' }
  & { createFavoriteShow: Maybe<(
    { __typename?: 'User' }
    & MyFavoriteShowsFragment
  )> }
);

export type DeleteFavoriteShowMutationVariables = {
  id: Scalars['ID']
};


export type DeleteFavoriteShowMutation = (
  { __typename?: 'Mutation' }
  & { deleteFavoriteShow: Maybe<(
    { __typename?: 'User' }
    & MyFavoriteShowsFragment
  )> }
);

export type GetShowsQueryVariables = {
  ids: Array<Maybe<Scalars['Int']>>
};


export type GetShowsQuery = (
  { __typename?: 'Query' }
  & { shows: Maybe<Array<Maybe<(
    { __typename?: 'Show' }
    & Pick<Show, 'id' | 'name' | 'premiered'>
    & { image: Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'medium'>
    )>, network: Maybe<(
      { __typename?: 'Network' }
      & Pick<Network, 'name'>
    )> }
  )>>> }
);

export type SearchQueryVariables = {
  query: Scalars['String']
};


export type SearchQuery = (
  { __typename?: 'Query' }
  & { search: Maybe<Array<Maybe<(
    { __typename?: 'Show' }
    & Pick<Show, 'id' | 'name' | 'premiered'>
    & { image: Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'medium'>
    )>, network: Maybe<(
      { __typename?: 'Network' }
      & Pick<Network, 'name'>
    )> }
  )>>> }
);

export type EpisodesQueryVariables = {
  showId: Scalars['Int']
};


export type EpisodesQuery = (
  { __typename?: 'Query' }
  & { episodes: Maybe<Array<Maybe<(
    { __typename?: 'Episode' }
    & Pick<Episode, 'id' | 'name' | 'season' | 'number' | 'airstamp'>
  )>>> }
);

export type GetMyFavoriteShowsQueryVariables = {};


export type GetMyFavoriteShowsQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & MyFavoriteShowsFragment
  )> }
);

export type MyFavoriteShowsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id'>
  & { favoriteShows: Array<(
    { __typename?: 'FavoriteShow' }
    & Pick<FavoriteShow, 'id' | 'tvmaze'>
  )> }
);

export type AuthenticateMutationVariables = {
  idToken: Scalars['String']
};


export type AuthenticateMutation = (
  { __typename?: 'Mutation' }
  & { authenticate: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  )> }
);
