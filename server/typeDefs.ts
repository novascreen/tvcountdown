import gql from 'graphql-tag';
import { typeDefs as prismaTypeDefs } from './generated/prisma-client/prisma-schema';

// TODO: How to import a type
// @ts-ignore
const [FavoriteShow] = prismaTypeDefs.match(/type FavoriteShow {[\s\S]*?}/);

export const typeDefs = gql`
  ${FavoriteShow}

  directive @isAuthenticated on QUERY | FIELD_DEFINITION | MUTATION
  directive @isOwner(type: String) on QUERY | FIELD_DEFINITION | MUTATION

  type Query {
    me: User @isAuthenticated
    search(query: String!): [Show]
    show(id: Int!): Show
    shows(ids: [Int]!): [Show]
    scheduleAll(previous: Boolean): [Episode]
    scheduleByDate(date: String!): [Episode]
    scheduleFavorites(showIds: [Int]!, previous: Boolean): [Episode]
    episode(id: Int!): Episode
    episodes(showId: Int!): [Episode]
    cast(showId: Int!): [CastMember]
  }

  type Mutation {
    authenticate(idToken: String!): User
    createFavoriteShow(tvmaze: Int!): User @isAuthenticated
    deleteFavoriteShow(id: ID!): User @isOwner(type: "favoriteShow")
  }

  type User {
    id: ID!
    email: String!
    name: String
    avatar: String
    identity: String
    favoriteShows: [FavoriteShow!]!
  }

  type Schedule {
    time: String
    days: [String]
  }

  type Rating {
    Rating: Int
  }

  type Country {
    name: String
    code: String
    timezone: String
  }

  type Network {
    id: Int
    name: String
    country: Country
  }

  type WebChannel {
    id: Int
    name: String
    country: Country
  }

  type Externals {
    tvrage: Int
    thetvdb: Int
    imdb: String
  }

  type Image {
    medium: String
    original: String
  }

  # Details for an episode
  type Episode {
    id: Int
    url: String
    name: String
    season: Int
    number: Int
    airdate: String
    airtime: String
    airstamp: String
    runtime: Int
    image: Image
    summary: String
    show: Show
  }

  type Season {
    id: Int
    url: String
    number: Int
    name: String
    episodeOrder: Int
    premiereDate: String
    endDate: String
    network: Network
    webChannel: WebChannel
    image: Image
    summary: String
    episodes: [Episode]
  }

  # Information for a show including list of episodes
  type Show {
    id: Int
    url: String
    name: String
    airedYears: String
    type: String
    language: String
    genres: [String]
    status: String
    officialSite: String
    runtime: Int
    premiered: String
    schedule: Schedule
    rating: Rating
    weight: Int
    network: Network
    webChannel: WebChannel
    externals: Externals
    image: Image
    summary: String
    updated: Int
    seasons: [Season]
    episodes: [Episode]
    previousEpisode: Episode
    nextEpisode: Episode
  }

  type CastMember {
    character: Character
    person: Person
    self: Boolean
    voide: Boolean
  }

  type Person {
    id: Int
    url: String
    name: String
    image: Image
    country: Country
    birthday: String
    deathday: String
    gender: String
  }

  type Character {
    id: Int
    url: String
    name: String
    image: Image
  }
`;
