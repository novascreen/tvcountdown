/* tslint:disable */
/** An object with an ID */
export interface Node {
  id: string /** The id of the object. */;
}

export interface Query {
  me?: User | null;
  search?: (Show | null)[] | null;
  show?: Show | null;
  shows?: (Show | null)[] | null;
  scheduleAll?: (Episode | null)[] | null;
  scheduleByDate?: (Episode | null)[] | null;
  scheduleFavorites?: (Episode | null)[] | null;
  episode?: Episode | null;
}

export interface User {
  id: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
  identity?: string | null;
  favoriteShows: FavoriteShow[];
}

export interface FavoriteShow extends Node {
  id: string;
  tvmaze: number;
  tvrage?: number | null;
  thetvdb?: number | null;
  imdb?: string | null;
  user?: User | null;
}

export interface Show {
  id?: number | null;
  url?: string | null;
  name?: string | null;
  airedYears?: string | null;
  type?: string | null;
  language?: string | null;
  genres?: (string | null)[] | null;
  status?: string | null;
  officialSite?: string | null;
  runtime?: number | null;
  premiered?: string | null;
  schedule?: Schedule | null;
  rating?: Rating | null;
  weight?: number | null;
  network?: Network | null;
  webChannel?: WebChannel | null;
  externals?: Externals | null;
  image?: Image | null;
  summary?: string | null;
  updated?: number | null;
  episodes?: (Episode | null)[] | null;
  previousEpisode?: Episode | null;
  nextEpisode?: Episode | null;
}

export interface Schedule {
  time?: string | null;
  days?: (string | null)[] | null;
}

export interface Rating {
  Rating?: number | null;
}

export interface Network {
  id?: number | null;
  name?: string | null;
  country?: Country | null;
}

export interface Country {
  name?: string | null;
  code?: string | null;
  timezone?: string | null;
}

export interface WebChannel {
  id?: number | null;
  name?: string | null;
  country?: Country | null;
}

export interface Externals {
  tvrage?: number | null;
  thetvdb?: number | null;
  imdb?: string | null;
}

export interface Image {
  medium?: string | null;
  original?: string | null;
}

export interface Episode {
  id?: number | null;
  url?: string | null;
  name?: string | null;
  season?: number | null;
  number?: number | null;
  airdate?: string | null;
  airtime?: string | null;
  airstamp?: string | null;
  runtime?: number | null;
  image?: Image | null;
  summary?: string | null;
  show?: Show | null;
}

export interface Mutation {
  authenticate?: User | null;
  createFavoriteShow?: User | null;
  deleteFavoriteShow?: User | null;
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | null /** Logical AND on all given filters. */;
  OR?: UserWhereInput[] | null /** Logical OR on all given filters. */;
  id?: string | null;
  id_not?: string | null /** All values that are not equal to given value. */;
  id_in?: string[] | null /** All values that are contained in given list. */;
  id_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  id_lt?: string | null /** All values less than the given value. */;
  id_lte?: string | null /** All values less than or equal the given value. */;
  id_gt?: string | null /** All values greater than the given value. */;
  id_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  id_contains?: string | null /** All values containing the given string. */;
  id_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  id_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  id_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  id_ends_with?: string | null /** All values ending with the given string. */;
  id_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  auth0id?: string | null;
  auth0id_not?:
    | string
    | null /** All values that are not equal to given value. */;
  auth0id_in?:
    | string[]
    | null /** All values that are contained in given list. */;
  auth0id_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  auth0id_lt?: string | null /** All values less than the given value. */;
  auth0id_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  auth0id_gt?: string | null /** All values greater than the given value. */;
  auth0id_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  auth0id_contains?:
    | string
    | null /** All values containing the given string. */;
  auth0id_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  auth0id_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  auth0id_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  auth0id_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  auth0id_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  identity?: string | null;
  identity_not?:
    | string
    | null /** All values that are not equal to given value. */;
  identity_in?:
    | string[]
    | null /** All values that are contained in given list. */;
  identity_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  identity_lt?: string | null /** All values less than the given value. */;
  identity_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  identity_gt?: string | null /** All values greater than the given value. */;
  identity_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  identity_contains?:
    | string
    | null /** All values containing the given string. */;
  identity_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  identity_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  identity_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  identity_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  identity_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  email?: string | null;
  email_not?:
    | string
    | null /** All values that are not equal to given value. */;
  email_in?:
    | string[]
    | null /** All values that are contained in given list. */;
  email_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  email_lt?: string | null /** All values less than the given value. */;
  email_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  email_gt?: string | null /** All values greater than the given value. */;
  email_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  email_contains?: string | null /** All values containing the given string. */;
  email_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  email_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  email_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  email_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  email_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  name?: string | null;
  name_not?: string | null /** All values that are not equal to given value. */;
  name_in?: string[] | null /** All values that are contained in given list. */;
  name_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  name_lt?: string | null /** All values less than the given value. */;
  name_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  name_gt?: string | null /** All values greater than the given value. */;
  name_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  name_contains?: string | null /** All values containing the given string. */;
  name_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  name_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  name_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  name_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  name_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  avatar?: string | null;
  avatar_not?:
    | string
    | null /** All values that are not equal to given value. */;
  avatar_in?:
    | string[]
    | null /** All values that are contained in given list. */;
  avatar_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  avatar_lt?: string | null /** All values less than the given value. */;
  avatar_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  avatar_gt?: string | null /** All values greater than the given value. */;
  avatar_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  avatar_contains?:
    | string
    | null /** All values containing the given string. */;
  avatar_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  avatar_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  avatar_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  avatar_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  avatar_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  favoriteShows_every?: FavoriteShowWhereInput | null;
  favoriteShows_some?: FavoriteShowWhereInput | null;
  favoriteShows_none?: FavoriteShowWhereInput | null;
}

export interface FavoriteShowWhereInput {
  AND?:
    | FavoriteShowWhereInput[]
    | null /** Logical AND on all given filters. */;
  OR?: FavoriteShowWhereInput[] | null /** Logical OR on all given filters. */;
  id?: string | null;
  id_not?: string | null /** All values that are not equal to given value. */;
  id_in?: string[] | null /** All values that are contained in given list. */;
  id_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  id_lt?: string | null /** All values less than the given value. */;
  id_lte?: string | null /** All values less than or equal the given value. */;
  id_gt?: string | null /** All values greater than the given value. */;
  id_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  id_contains?: string | null /** All values containing the given string. */;
  id_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  id_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  id_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  id_ends_with?: string | null /** All values ending with the given string. */;
  id_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  tvmaze?: number | null;
  tvmaze_not?:
    | number
    | null /** All values that are not equal to given value. */;
  tvmaze_in?:
    | number[]
    | null /** All values that are contained in given list. */;
  tvmaze_not_in?:
    | number[]
    | null /** All values that are not contained in given list. */;
  tvmaze_lt?: number | null /** All values less than the given value. */;
  tvmaze_lte?:
    | number
    | null /** All values less than or equal the given value. */;
  tvmaze_gt?: number | null /** All values greater than the given value. */;
  tvmaze_gte?:
    | number
    | null /** All values greater than or equal the given value. */;
  tvrage?: number | null;
  tvrage_not?:
    | number
    | null /** All values that are not equal to given value. */;
  tvrage_in?:
    | number[]
    | null /** All values that are contained in given list. */;
  tvrage_not_in?:
    | number[]
    | null /** All values that are not contained in given list. */;
  tvrage_lt?: number | null /** All values less than the given value. */;
  tvrage_lte?:
    | number
    | null /** All values less than or equal the given value. */;
  tvrage_gt?: number | null /** All values greater than the given value. */;
  tvrage_gte?:
    | number
    | null /** All values greater than or equal the given value. */;
  thetvdb?: number | null;
  thetvdb_not?:
    | number
    | null /** All values that are not equal to given value. */;
  thetvdb_in?:
    | number[]
    | null /** All values that are contained in given list. */;
  thetvdb_not_in?:
    | number[]
    | null /** All values that are not contained in given list. */;
  thetvdb_lt?: number | null /** All values less than the given value. */;
  thetvdb_lte?:
    | number
    | null /** All values less than or equal the given value. */;
  thetvdb_gt?: number | null /** All values greater than the given value. */;
  thetvdb_gte?:
    | number
    | null /** All values greater than or equal the given value. */;
  imdb?: string | null;
  imdb_not?: string | null /** All values that are not equal to given value. */;
  imdb_in?: string[] | null /** All values that are contained in given list. */;
  imdb_not_in?:
    | string[]
    | null /** All values that are not contained in given list. */;
  imdb_lt?: string | null /** All values less than the given value. */;
  imdb_lte?:
    | string
    | null /** All values less than or equal the given value. */;
  imdb_gt?: string | null /** All values greater than the given value. */;
  imdb_gte?:
    | string
    | null /** All values greater than or equal the given value. */;
  imdb_contains?: string | null /** All values containing the given string. */;
  imdb_not_contains?:
    | string
    | null /** All values not containing the given string. */;
  imdb_starts_with?:
    | string
    | null /** All values starting with the given string. */;
  imdb_not_starts_with?:
    | string
    | null /** All values not starting with the given string. */;
  imdb_ends_with?:
    | string
    | null /** All values ending with the given string. */;
  imdb_not_ends_with?:
    | string
    | null /** All values not ending with the given string. */;
  user?: UserWhereInput | null;
}
export interface SearchQueryArgs {
  query: string;
}
export interface ShowQueryArgs {
  id: number;
}
export interface ShowsQueryArgs {
  ids: (number | null)[];
}
export interface ScheduleAllQueryArgs {
  previous?: boolean | null;
}
export interface ScheduleByDateQueryArgs {
  date: string;
}
export interface ScheduleFavoritesQueryArgs {
  showIds: (number | null)[];
  previous?: boolean | null;
}
export interface EpisodeQueryArgs {
  id: number;
}
export interface UserFavoriteShowArgs {
  where?: UserWhereInput | null;
}
export interface AuthenticateMutationArgs {
  idToken: string;
}
export interface CreateFavoriteShowMutationArgs {
  tvmaze: number;
}
export interface DeleteFavoriteShowMutationArgs {
  id: string;
}
