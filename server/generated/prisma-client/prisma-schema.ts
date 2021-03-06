export const typeDefs = /* GraphQL */ `type AggregateFavoriteShow {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type FavoriteShow {
  id: ID!
  tvmaze: Int!
  tvrage: Int
  thetvdb: Int
  imdb: String
  user: User
}

type FavoriteShowConnection {
  pageInfo: PageInfo!
  edges: [FavoriteShowEdge]!
  aggregate: AggregateFavoriteShow!
}

input FavoriteShowCreateInput {
  tvmaze: Int!
  tvrage: Int
  thetvdb: Int
  imdb: String
  user: UserCreateOneWithoutFavoriteShowsInput
}

input FavoriteShowCreateManyWithoutUserInput {
  create: [FavoriteShowCreateWithoutUserInput!]
  connect: [FavoriteShowWhereUniqueInput!]
}

input FavoriteShowCreateWithoutUserInput {
  tvmaze: Int!
  tvrage: Int
  thetvdb: Int
  imdb: String
}

type FavoriteShowEdge {
  node: FavoriteShow!
  cursor: String!
}

enum FavoriteShowOrderByInput {
  id_ASC
  id_DESC
  tvmaze_ASC
  tvmaze_DESC
  tvrage_ASC
  tvrage_DESC
  thetvdb_ASC
  thetvdb_DESC
  imdb_ASC
  imdb_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type FavoriteShowPreviousValues {
  id: ID!
  tvmaze: Int!
  tvrage: Int
  thetvdb: Int
  imdb: String
}

input FavoriteShowScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  tvmaze: Int
  tvmaze_not: Int
  tvmaze_in: [Int!]
  tvmaze_not_in: [Int!]
  tvmaze_lt: Int
  tvmaze_lte: Int
  tvmaze_gt: Int
  tvmaze_gte: Int
  tvrage: Int
  tvrage_not: Int
  tvrage_in: [Int!]
  tvrage_not_in: [Int!]
  tvrage_lt: Int
  tvrage_lte: Int
  tvrage_gt: Int
  tvrage_gte: Int
  thetvdb: Int
  thetvdb_not: Int
  thetvdb_in: [Int!]
  thetvdb_not_in: [Int!]
  thetvdb_lt: Int
  thetvdb_lte: Int
  thetvdb_gt: Int
  thetvdb_gte: Int
  imdb: String
  imdb_not: String
  imdb_in: [String!]
  imdb_not_in: [String!]
  imdb_lt: String
  imdb_lte: String
  imdb_gt: String
  imdb_gte: String
  imdb_contains: String
  imdb_not_contains: String
  imdb_starts_with: String
  imdb_not_starts_with: String
  imdb_ends_with: String
  imdb_not_ends_with: String
  AND: [FavoriteShowScalarWhereInput!]
  OR: [FavoriteShowScalarWhereInput!]
  NOT: [FavoriteShowScalarWhereInput!]
}

type FavoriteShowSubscriptionPayload {
  mutation: MutationType!
  node: FavoriteShow
  updatedFields: [String!]
  previousValues: FavoriteShowPreviousValues
}

input FavoriteShowSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: FavoriteShowWhereInput
  AND: [FavoriteShowSubscriptionWhereInput!]
  OR: [FavoriteShowSubscriptionWhereInput!]
  NOT: [FavoriteShowSubscriptionWhereInput!]
}

input FavoriteShowUpdateInput {
  tvmaze: Int
  tvrage: Int
  thetvdb: Int
  imdb: String
  user: UserUpdateOneWithoutFavoriteShowsInput
}

input FavoriteShowUpdateManyDataInput {
  tvmaze: Int
  tvrage: Int
  thetvdb: Int
  imdb: String
}

input FavoriteShowUpdateManyMutationInput {
  tvmaze: Int
  tvrage: Int
  thetvdb: Int
  imdb: String
}

input FavoriteShowUpdateManyWithoutUserInput {
  create: [FavoriteShowCreateWithoutUserInput!]
  delete: [FavoriteShowWhereUniqueInput!]
  connect: [FavoriteShowWhereUniqueInput!]
  disconnect: [FavoriteShowWhereUniqueInput!]
  update: [FavoriteShowUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [FavoriteShowUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [FavoriteShowScalarWhereInput!]
  updateMany: [FavoriteShowUpdateManyWithWhereNestedInput!]
}

input FavoriteShowUpdateManyWithWhereNestedInput {
  where: FavoriteShowScalarWhereInput!
  data: FavoriteShowUpdateManyDataInput!
}

input FavoriteShowUpdateWithoutUserDataInput {
  tvmaze: Int
  tvrage: Int
  thetvdb: Int
  imdb: String
}

input FavoriteShowUpdateWithWhereUniqueWithoutUserInput {
  where: FavoriteShowWhereUniqueInput!
  data: FavoriteShowUpdateWithoutUserDataInput!
}

input FavoriteShowUpsertWithWhereUniqueWithoutUserInput {
  where: FavoriteShowWhereUniqueInput!
  update: FavoriteShowUpdateWithoutUserDataInput!
  create: FavoriteShowCreateWithoutUserInput!
}

input FavoriteShowWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  tvmaze: Int
  tvmaze_not: Int
  tvmaze_in: [Int!]
  tvmaze_not_in: [Int!]
  tvmaze_lt: Int
  tvmaze_lte: Int
  tvmaze_gt: Int
  tvmaze_gte: Int
  tvrage: Int
  tvrage_not: Int
  tvrage_in: [Int!]
  tvrage_not_in: [Int!]
  tvrage_lt: Int
  tvrage_lte: Int
  tvrage_gt: Int
  tvrage_gte: Int
  thetvdb: Int
  thetvdb_not: Int
  thetvdb_in: [Int!]
  thetvdb_not_in: [Int!]
  thetvdb_lt: Int
  thetvdb_lte: Int
  thetvdb_gt: Int
  thetvdb_gte: Int
  imdb: String
  imdb_not: String
  imdb_in: [String!]
  imdb_not_in: [String!]
  imdb_lt: String
  imdb_lte: String
  imdb_gt: String
  imdb_gte: String
  imdb_contains: String
  imdb_not_contains: String
  imdb_starts_with: String
  imdb_not_starts_with: String
  imdb_ends_with: String
  imdb_not_ends_with: String
  user: UserWhereInput
  AND: [FavoriteShowWhereInput!]
  OR: [FavoriteShowWhereInput!]
  NOT: [FavoriteShowWhereInput!]
}

input FavoriteShowWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createFavoriteShow(data: FavoriteShowCreateInput!): FavoriteShow!
  updateFavoriteShow(data: FavoriteShowUpdateInput!, where: FavoriteShowWhereUniqueInput!): FavoriteShow
  updateManyFavoriteShows(data: FavoriteShowUpdateManyMutationInput!, where: FavoriteShowWhereInput): BatchPayload!
  upsertFavoriteShow(where: FavoriteShowWhereUniqueInput!, create: FavoriteShowCreateInput!, update: FavoriteShowUpdateInput!): FavoriteShow!
  deleteFavoriteShow(where: FavoriteShowWhereUniqueInput!): FavoriteShow
  deleteManyFavoriteShows(where: FavoriteShowWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  favoriteShow(where: FavoriteShowWhereUniqueInput!): FavoriteShow
  favoriteShows(where: FavoriteShowWhereInput, orderBy: FavoriteShowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [FavoriteShow]!
  favoriteShowsConnection(where: FavoriteShowWhereInput, orderBy: FavoriteShowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FavoriteShowConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  favoriteShow(where: FavoriteShowSubscriptionWhereInput): FavoriteShowSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  auth0id: String!
  identity: String
  email: String!
  name: String!
  avatar: String
  favoriteShows(where: FavoriteShowWhereInput, orderBy: FavoriteShowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [FavoriteShow!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  auth0id: String!
  identity: String
  email: String!
  name: String!
  avatar: String
  favoriteShows: FavoriteShowCreateManyWithoutUserInput
}

input UserCreateOneWithoutFavoriteShowsInput {
  create: UserCreateWithoutFavoriteShowsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutFavoriteShowsInput {
  auth0id: String!
  identity: String
  email: String!
  name: String!
  avatar: String
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  auth0id_ASC
  auth0id_DESC
  identity_ASC
  identity_DESC
  email_ASC
  email_DESC
  name_ASC
  name_DESC
  avatar_ASC
  avatar_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  auth0id: String!
  identity: String
  email: String!
  name: String!
  avatar: String
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  auth0id: String
  identity: String
  email: String
  name: String
  avatar: String
  favoriteShows: FavoriteShowUpdateManyWithoutUserInput
}

input UserUpdateManyMutationInput {
  auth0id: String
  identity: String
  email: String
  name: String
  avatar: String
}

input UserUpdateOneWithoutFavoriteShowsInput {
  create: UserCreateWithoutFavoriteShowsInput
  update: UserUpdateWithoutFavoriteShowsDataInput
  upsert: UserUpsertWithoutFavoriteShowsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutFavoriteShowsDataInput {
  auth0id: String
  identity: String
  email: String
  name: String
  avatar: String
}

input UserUpsertWithoutFavoriteShowsInput {
  update: UserUpdateWithoutFavoriteShowsDataInput!
  create: UserCreateWithoutFavoriteShowsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  auth0id: String
  auth0id_not: String
  auth0id_in: [String!]
  auth0id_not_in: [String!]
  auth0id_lt: String
  auth0id_lte: String
  auth0id_gt: String
  auth0id_gte: String
  auth0id_contains: String
  auth0id_not_contains: String
  auth0id_starts_with: String
  auth0id_not_starts_with: String
  auth0id_ends_with: String
  auth0id_not_ends_with: String
  identity: String
  identity_not: String
  identity_in: [String!]
  identity_not_in: [String!]
  identity_lt: String
  identity_lte: String
  identity_gt: String
  identity_gte: String
  identity_contains: String
  identity_not_contains: String
  identity_starts_with: String
  identity_not_starts_with: String
  identity_ends_with: String
  identity_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  avatar: String
  avatar_not: String
  avatar_in: [String!]
  avatar_not_in: [String!]
  avatar_lt: String
  avatar_lte: String
  avatar_gt: String
  avatar_gte: String
  avatar_contains: String
  avatar_not_contains: String
  avatar_starts_with: String
  avatar_not_starts_with: String
  avatar_ends_with: String
  avatar_not_ends_with: String
  favoriteShows_every: FavoriteShowWhereInput
  favoriteShows_some: FavoriteShowWhereInput
  favoriteShows_none: FavoriteShowWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  auth0id: String
  email: String
}
`