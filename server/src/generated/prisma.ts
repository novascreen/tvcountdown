import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type FavoriteShow implements Node {
  id: ID!
  tvmaze: Int!
  tvrage: Int
  thetvdb: Int
  imdb: String
  user(where: UserWhereInput): User
}

type User implements Node {
  id: ID!
  email: String!
  role: Role!
  name: String
  avatar: String
  auth0id: String!
  identity: String
  favoriteShows(where: FavoriteShowWhereInput, orderBy: FavoriteShowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [FavoriteShow!]
}

type AggregateFavoriteShow {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

"""
A connection to a list of items.
"""
type FavoriteShowConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
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

"""
An edge in a connection.
"""
type FavoriteShowEdge {
  """
  The item at the end of the edge.
  """
  node: FavoriteShow!
  """
  A cursor for use in pagination.
  """
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
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type FavoriteShowPreviousValues {
  id: ID!
  tvmaze: Int!
  tvrage: Int
  thetvdb: Int
  imdb: String
}

type FavoriteShowSubscriptionPayload {
  mutation: MutationType!
  node: FavoriteShow
  updatedFields: [String!]
  previousValues: FavoriteShowPreviousValues
}

input FavoriteShowSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [FavoriteShowSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [FavoriteShowSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: FavoriteShowWhereInput
}

input FavoriteShowUpdateInput {
  tvmaze: Int
  tvrage: Int
  thetvdb: Int
  imdb: String
  user: UserUpdateOneWithoutFavoriteShowsInput
}

input FavoriteShowUpdateManyWithoutUserInput {
  create: [FavoriteShowCreateWithoutUserInput!]
  connect: [FavoriteShowWhereUniqueInput!]
  disconnect: [FavoriteShowWhereUniqueInput!]
  delete: [FavoriteShowWhereUniqueInput!]
  update: [FavoriteShowUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [FavoriteShowUpsertWithWhereUniqueWithoutUserInput!]
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
  """
  Logical AND on all given filters.
  """
  AND: [FavoriteShowWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [FavoriteShowWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  tvmaze: Int
  """
  All values that are not equal to given value.
  """
  tvmaze_not: Int
  """
  All values that are contained in given list.
  """
  tvmaze_in: [Int!]
  """
  All values that are not contained in given list.
  """
  tvmaze_not_in: [Int!]
  """
  All values less than the given value.
  """
  tvmaze_lt: Int
  """
  All values less than or equal the given value.
  """
  tvmaze_lte: Int
  """
  All values greater than the given value.
  """
  tvmaze_gt: Int
  """
  All values greater than or equal the given value.
  """
  tvmaze_gte: Int
  tvrage: Int
  """
  All values that are not equal to given value.
  """
  tvrage_not: Int
  """
  All values that are contained in given list.
  """
  tvrage_in: [Int!]
  """
  All values that are not contained in given list.
  """
  tvrage_not_in: [Int!]
  """
  All values less than the given value.
  """
  tvrage_lt: Int
  """
  All values less than or equal the given value.
  """
  tvrage_lte: Int
  """
  All values greater than the given value.
  """
  tvrage_gt: Int
  """
  All values greater than or equal the given value.
  """
  tvrage_gte: Int
  thetvdb: Int
  """
  All values that are not equal to given value.
  """
  thetvdb_not: Int
  """
  All values that are contained in given list.
  """
  thetvdb_in: [Int!]
  """
  All values that are not contained in given list.
  """
  thetvdb_not_in: [Int!]
  """
  All values less than the given value.
  """
  thetvdb_lt: Int
  """
  All values less than or equal the given value.
  """
  thetvdb_lte: Int
  """
  All values greater than the given value.
  """
  thetvdb_gt: Int
  """
  All values greater than or equal the given value.
  """
  thetvdb_gte: Int
  imdb: String
  """
  All values that are not equal to given value.
  """
  imdb_not: String
  """
  All values that are contained in given list.
  """
  imdb_in: [String!]
  """
  All values that are not contained in given list.
  """
  imdb_not_in: [String!]
  """
  All values less than the given value.
  """
  imdb_lt: String
  """
  All values less than or equal the given value.
  """
  imdb_lte: String
  """
  All values greater than the given value.
  """
  imdb_gt: String
  """
  All values greater than or equal the given value.
  """
  imdb_gte: String
  """
  All values containing the given string.
  """
  imdb_contains: String
  """
  All values not containing the given string.
  """
  imdb_not_contains: String
  """
  All values starting with the given string.
  """
  imdb_starts_with: String
  """
  All values not starting with the given string.
  """
  imdb_not_starts_with: String
  """
  All values ending with the given string.
  """
  imdb_ends_with: String
  """
  All values not ending with the given string.
  """
  imdb_not_ends_with: String
  user: UserWhereInput
}

input FavoriteShowWhereUniqueInput {
  id: ID
}

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

"""
Information about pagination in a connection.
"""
type PageInfo {
  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!
  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String
  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

enum Role {
  ADMIN
  USER
}

"""
A connection to a list of items.
"""
type UserConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  role: Role
  name: String
  avatar: String
  auth0id: String!
  identity: String
  favoriteShows: FavoriteShowCreateManyWithoutUserInput
}

input UserCreateOneWithoutFavoriteShowsInput {
  create: UserCreateWithoutFavoriteShowsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutFavoriteShowsInput {
  email: String!
  role: Role
  name: String
  avatar: String
  auth0id: String!
  identity: String
}

"""
An edge in a connection.
"""
type UserEdge {
  """
  The item at the end of the edge.
  """
  node: User!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  role_ASC
  role_DESC
  name_ASC
  name_DESC
  avatar_ASC
  avatar_DESC
  auth0id_ASC
  auth0id_DESC
  identity_ASC
  identity_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  role: Role!
  name: String
  avatar: String
  auth0id: String!
  identity: String
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  email: String
  role: Role
  name: String
  avatar: String
  auth0id: String
  identity: String
  favoriteShows: FavoriteShowUpdateManyWithoutUserInput
}

input UserUpdateOneWithoutFavoriteShowsInput {
  create: UserCreateWithoutFavoriteShowsInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserUpdateWithoutFavoriteShowsDataInput
  upsert: UserUpsertWithoutFavoriteShowsInput
}

input UserUpdateWithoutFavoriteShowsDataInput {
  email: String
  role: Role
  name: String
  avatar: String
  auth0id: String
  identity: String
}

input UserUpsertWithoutFavoriteShowsInput {
  update: UserUpdateWithoutFavoriteShowsDataInput!
  create: UserCreateWithoutFavoriteShowsInput!
}

input UserWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  email: String
  """
  All values that are not equal to given value.
  """
  email_not: String
  """
  All values that are contained in given list.
  """
  email_in: [String!]
  """
  All values that are not contained in given list.
  """
  email_not_in: [String!]
  """
  All values less than the given value.
  """
  email_lt: String
  """
  All values less than or equal the given value.
  """
  email_lte: String
  """
  All values greater than the given value.
  """
  email_gt: String
  """
  All values greater than or equal the given value.
  """
  email_gte: String
  """
  All values containing the given string.
  """
  email_contains: String
  """
  All values not containing the given string.
  """
  email_not_contains: String
  """
  All values starting with the given string.
  """
  email_starts_with: String
  """
  All values not starting with the given string.
  """
  email_not_starts_with: String
  """
  All values ending with the given string.
  """
  email_ends_with: String
  """
  All values not ending with the given string.
  """
  email_not_ends_with: String
  role: Role
  """
  All values that are not equal to given value.
  """
  role_not: Role
  """
  All values that are contained in given list.
  """
  role_in: [Role!]
  """
  All values that are not contained in given list.
  """
  role_not_in: [Role!]
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  avatar: String
  """
  All values that are not equal to given value.
  """
  avatar_not: String
  """
  All values that are contained in given list.
  """
  avatar_in: [String!]
  """
  All values that are not contained in given list.
  """
  avatar_not_in: [String!]
  """
  All values less than the given value.
  """
  avatar_lt: String
  """
  All values less than or equal the given value.
  """
  avatar_lte: String
  """
  All values greater than the given value.
  """
  avatar_gt: String
  """
  All values greater than or equal the given value.
  """
  avatar_gte: String
  """
  All values containing the given string.
  """
  avatar_contains: String
  """
  All values not containing the given string.
  """
  avatar_not_contains: String
  """
  All values starting with the given string.
  """
  avatar_starts_with: String
  """
  All values not starting with the given string.
  """
  avatar_not_starts_with: String
  """
  All values ending with the given string.
  """
  avatar_ends_with: String
  """
  All values not ending with the given string.
  """
  avatar_not_ends_with: String
  auth0id: String
  """
  All values that are not equal to given value.
  """
  auth0id_not: String
  """
  All values that are contained in given list.
  """
  auth0id_in: [String!]
  """
  All values that are not contained in given list.
  """
  auth0id_not_in: [String!]
  """
  All values less than the given value.
  """
  auth0id_lt: String
  """
  All values less than or equal the given value.
  """
  auth0id_lte: String
  """
  All values greater than the given value.
  """
  auth0id_gt: String
  """
  All values greater than or equal the given value.
  """
  auth0id_gte: String
  """
  All values containing the given string.
  """
  auth0id_contains: String
  """
  All values not containing the given string.
  """
  auth0id_not_contains: String
  """
  All values starting with the given string.
  """
  auth0id_starts_with: String
  """
  All values not starting with the given string.
  """
  auth0id_not_starts_with: String
  """
  All values ending with the given string.
  """
  auth0id_ends_with: String
  """
  All values not ending with the given string.
  """
  auth0id_not_ends_with: String
  identity: String
  """
  All values that are not equal to given value.
  """
  identity_not: String
  """
  All values that are contained in given list.
  """
  identity_in: [String!]
  """
  All values that are not contained in given list.
  """
  identity_not_in: [String!]
  """
  All values less than the given value.
  """
  identity_lt: String
  """
  All values less than or equal the given value.
  """
  identity_lte: String
  """
  All values greater than the given value.
  """
  identity_gt: String
  """
  All values greater than or equal the given value.
  """
  identity_gte: String
  """
  All values containing the given string.
  """
  identity_contains: String
  """
  All values not containing the given string.
  """
  identity_not_contains: String
  """
  All values starting with the given string.
  """
  identity_starts_with: String
  """
  All values not starting with the given string.
  """
  identity_not_starts_with: String
  """
  All values ending with the given string.
  """
  identity_ends_with: String
  """
  All values not ending with the given string.
  """
  identity_not_ends_with: String
  favoriteShows_every: FavoriteShowWhereInput
  favoriteShows_some: FavoriteShowWhereInput
  favoriteShows_none: FavoriteShowWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
  auth0id: String
}

type Mutation {
  createFavoriteShow(data: FavoriteShowCreateInput!): FavoriteShow!
  createUser(data: UserCreateInput!): User!
  updateFavoriteShow(data: FavoriteShowUpdateInput!, where: FavoriteShowWhereUniqueInput!): FavoriteShow
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  deleteFavoriteShow(where: FavoriteShowWhereUniqueInput!): FavoriteShow
  deleteUser(where: UserWhereUniqueInput!): User
  upsertFavoriteShow(where: FavoriteShowWhereUniqueInput!, create: FavoriteShowCreateInput!, update: FavoriteShowUpdateInput!): FavoriteShow!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  updateManyFavoriteShows(data: FavoriteShowUpdateInput!, where: FavoriteShowWhereInput!): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput!): BatchPayload!
  deleteManyFavoriteShows(where: FavoriteShowWhereInput!): BatchPayload!
  deleteManyUsers(where: UserWhereInput!): BatchPayload!
}

type Query {
  favoriteShows(where: FavoriteShowWhereInput, orderBy: FavoriteShowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [FavoriteShow]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  favoriteShow(where: FavoriteShowWhereUniqueInput!): FavoriteShow
  user(where: UserWhereUniqueInput!): User
  favoriteShowsConnection(where: FavoriteShowWhereInput, orderBy: FavoriteShowOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FavoriteShowConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  favoriteShow(where: FavoriteShowSubscriptionWhereInput): FavoriteShowSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}
`

export type Role = 
  'ADMIN' |
  'USER'

export type FavoriteShowOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'tvmaze_ASC' |
  'tvmaze_DESC' |
  'tvrage_ASC' |
  'tvrage_DESC' |
  'thetvdb_ASC' |
  'thetvdb_DESC' |
  'imdb_ASC' |
  'imdb_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type UserOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'email_ASC' |
  'email_DESC' |
  'role_ASC' |
  'role_DESC' |
  'name_ASC' |
  'name_DESC' |
  'avatar_ASC' |
  'avatar_DESC' |
  'auth0id_ASC' |
  'auth0id_DESC' |
  'identity_ASC' |
  'identity_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export interface UserCreateOneWithoutFavoriteShowsInput {
  create?: UserCreateWithoutFavoriteShowsInput
  connect?: UserWhereUniqueInput
}

export interface FavoriteShowWhereInput {
  AND?: FavoriteShowWhereInput[] | FavoriteShowWhereInput
  OR?: FavoriteShowWhereInput[] | FavoriteShowWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  tvmaze?: Int
  tvmaze_not?: Int
  tvmaze_in?: Int[] | Int
  tvmaze_not_in?: Int[] | Int
  tvmaze_lt?: Int
  tvmaze_lte?: Int
  tvmaze_gt?: Int
  tvmaze_gte?: Int
  tvrage?: Int
  tvrage_not?: Int
  tvrage_in?: Int[] | Int
  tvrage_not_in?: Int[] | Int
  tvrage_lt?: Int
  tvrage_lte?: Int
  tvrage_gt?: Int
  tvrage_gte?: Int
  thetvdb?: Int
  thetvdb_not?: Int
  thetvdb_in?: Int[] | Int
  thetvdb_not_in?: Int[] | Int
  thetvdb_lt?: Int
  thetvdb_lte?: Int
  thetvdb_gt?: Int
  thetvdb_gte?: Int
  imdb?: String
  imdb_not?: String
  imdb_in?: String[] | String
  imdb_not_in?: String[] | String
  imdb_lt?: String
  imdb_lte?: String
  imdb_gt?: String
  imdb_gte?: String
  imdb_contains?: String
  imdb_not_contains?: String
  imdb_starts_with?: String
  imdb_not_starts_with?: String
  imdb_ends_with?: String
  imdb_not_ends_with?: String
  user?: UserWhereInput
}

export interface FavoriteShowCreateManyWithoutUserInput {
  create?: FavoriteShowCreateWithoutUserInput[] | FavoriteShowCreateWithoutUserInput
  connect?: FavoriteShowWhereUniqueInput[] | FavoriteShowWhereUniqueInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  role?: Role
  role_not?: Role
  role_in?: Role[] | Role
  role_not_in?: Role[] | Role
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  avatar?: String
  avatar_not?: String
  avatar_in?: String[] | String
  avatar_not_in?: String[] | String
  avatar_lt?: String
  avatar_lte?: String
  avatar_gt?: String
  avatar_gte?: String
  avatar_contains?: String
  avatar_not_contains?: String
  avatar_starts_with?: String
  avatar_not_starts_with?: String
  avatar_ends_with?: String
  avatar_not_ends_with?: String
  auth0id?: String
  auth0id_not?: String
  auth0id_in?: String[] | String
  auth0id_not_in?: String[] | String
  auth0id_lt?: String
  auth0id_lte?: String
  auth0id_gt?: String
  auth0id_gte?: String
  auth0id_contains?: String
  auth0id_not_contains?: String
  auth0id_starts_with?: String
  auth0id_not_starts_with?: String
  auth0id_ends_with?: String
  auth0id_not_ends_with?: String
  identity?: String
  identity_not?: String
  identity_in?: String[] | String
  identity_not_in?: String[] | String
  identity_lt?: String
  identity_lte?: String
  identity_gt?: String
  identity_gte?: String
  identity_contains?: String
  identity_not_contains?: String
  identity_starts_with?: String
  identity_not_starts_with?: String
  identity_ends_with?: String
  identity_not_ends_with?: String
  favoriteShows_every?: FavoriteShowWhereInput
  favoriteShows_some?: FavoriteShowWhereInput
  favoriteShows_none?: FavoriteShowWhereInput
}

export interface FavoriteShowUpdateManyWithoutUserInput {
  create?: FavoriteShowCreateWithoutUserInput[] | FavoriteShowCreateWithoutUserInput
  connect?: FavoriteShowWhereUniqueInput[] | FavoriteShowWhereUniqueInput
  disconnect?: FavoriteShowWhereUniqueInput[] | FavoriteShowWhereUniqueInput
  delete?: FavoriteShowWhereUniqueInput[] | FavoriteShowWhereUniqueInput
  update?: FavoriteShowUpdateWithWhereUniqueWithoutUserInput[] | FavoriteShowUpdateWithWhereUniqueWithoutUserInput
  upsert?: FavoriteShowUpsertWithWhereUniqueWithoutUserInput[] | FavoriteShowUpsertWithWhereUniqueWithoutUserInput
}

export interface FavoriteShowUpdateInput {
  tvmaze?: Int
  tvrage?: Int
  thetvdb?: Int
  imdb?: String
  user?: UserUpdateOneWithoutFavoriteShowsInput
}

export interface UserUpdateInput {
  email?: String
  role?: Role
  name?: String
  avatar?: String
  auth0id?: String
  identity?: String
  favoriteShows?: FavoriteShowUpdateManyWithoutUserInput
}

export interface FavoriteShowCreateWithoutUserInput {
  tvmaze: Int
  tvrage?: Int
  thetvdb?: Int
  imdb?: String
}

export interface UserUpsertWithoutFavoriteShowsInput {
  update: UserUpdateWithoutFavoriteShowsDataInput
  create: UserCreateWithoutFavoriteShowsInput
}

export interface FavoriteShowWhereUniqueInput {
  id?: ID_Input
}

export interface UserUpdateWithoutFavoriteShowsDataInput {
  email?: String
  role?: Role
  name?: String
  avatar?: String
  auth0id?: String
  identity?: String
}

export interface FavoriteShowSubscriptionWhereInput {
  AND?: FavoriteShowSubscriptionWhereInput[] | FavoriteShowSubscriptionWhereInput
  OR?: FavoriteShowSubscriptionWhereInput[] | FavoriteShowSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: FavoriteShowWhereInput
}

export interface FavoriteShowUpdateWithoutUserDataInput {
  tvmaze?: Int
  tvrage?: Int
  thetvdb?: Int
  imdb?: String
}

export interface UserCreateInput {
  email: String
  role?: Role
  name?: String
  avatar?: String
  auth0id: String
  identity?: String
  favoriteShows?: FavoriteShowCreateManyWithoutUserInput
}

export interface UserCreateWithoutFavoriteShowsInput {
  email: String
  role?: Role
  name?: String
  avatar?: String
  auth0id: String
  identity?: String
}

export interface UserUpdateOneWithoutFavoriteShowsInput {
  create?: UserCreateWithoutFavoriteShowsInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateWithoutFavoriteShowsDataInput
  upsert?: UserUpsertWithoutFavoriteShowsInput
}

export interface FavoriteShowCreateInput {
  tvmaze: Int
  tvrage?: Int
  thetvdb?: Int
  imdb?: String
  user?: UserCreateOneWithoutFavoriteShowsInput
}

export interface FavoriteShowUpdateWithWhereUniqueWithoutUserInput {
  where: FavoriteShowWhereUniqueInput
  data: FavoriteShowUpdateWithoutUserDataInput
}

export interface FavoriteShowUpsertWithWhereUniqueWithoutUserInput {
  where: FavoriteShowWhereUniqueInput
  update: FavoriteShowUpdateWithoutUserDataInput
  create: FavoriteShowCreateWithoutUserInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  email?: String
  auth0id?: String
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  role: Role
  name?: String
  avatar?: String
  auth0id: String
  identity?: String
}

export interface BatchPayload {
  count: Long
}

export interface User extends Node {
  id: ID_Output
  email: String
  role: Role
  name?: String
  avatar?: String
  auth0id: String
  identity?: String
  favoriteShows?: FavoriteShow[]
}

export interface FavoriteShowSubscriptionPayload {
  mutation: MutationType
  node?: FavoriteShow
  updatedFields?: String[]
  previousValues?: FavoriteShowPreviousValues
}

export interface FavoriteShowPreviousValues {
  id: ID_Output
  tvmaze: Int
  tvrage?: Int
  thetvdb?: Int
  imdb?: String
}

/*
 * A connection to a list of items.

 */
export interface FavoriteShowConnection {
  pageInfo: PageInfo
  edges: FavoriteShowEdge[]
  aggregate: AggregateFavoriteShow
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface AggregateUser {
  count: Int
}

export interface FavoriteShow extends Node {
  id: ID_Output
  tvmaze: Int
  tvrage?: Int
  thetvdb?: Int
  imdb?: String
  user?: User
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

/*
 * An edge in a connection.

 */
export interface FavoriteShowEdge {
  node: FavoriteShow
  cursor: String
}

export interface AggregateFavoriteShow {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

/*
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  favoriteShows: (args: { where?: FavoriteShowWhereInput, orderBy?: FavoriteShowOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<FavoriteShow[]>
  users: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<User[]>
  favoriteShow: (args: { where: FavoriteShowWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<FavoriteShow | null>
  user: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  favoriteShowsConnection: (args: { where?: FavoriteShowWhereInput, orderBy?: FavoriteShowOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<FavoriteShowConnection>
  usersConnection: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<UserConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createFavoriteShow: (args: { data: FavoriteShowCreateInput }, info?: GraphQLResolveInfo | string) => Promise<FavoriteShow>
  createUser: (args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  updateFavoriteShow: (args: { data: FavoriteShowUpdateInput, where: FavoriteShowWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<FavoriteShow | null>
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  deleteFavoriteShow: (args: { where: FavoriteShowWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<FavoriteShow | null>
  deleteUser: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  upsertFavoriteShow: (args: { where: FavoriteShowWhereUniqueInput, create: FavoriteShowCreateInput, update: FavoriteShowUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<FavoriteShow>
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  updateManyFavoriteShows: (args: { data: FavoriteShowUpdateInput, where: FavoriteShowWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyUsers: (args: { data: UserUpdateInput, where: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyFavoriteShows: (args: { where: FavoriteShowWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyUsers: (args: { where: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  favoriteShow: (args: { where?: FavoriteShowSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<FavoriteShowSubscriptionPayload>>
  user: (args: { where?: UserSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<UserSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    FavoriteShow: (where: FavoriteShowWhereInput): Promise<boolean> => super.existsDelegate('query', 'favoriteShows', { where }, {}, '{ id }'),
    User: (where: UserWhereInput): Promise<boolean> => super.existsDelegate('query', 'users', { where }, {}, '{ id }')
  }

  query: Query = {
    favoriteShows: (args, info): Promise<FavoriteShow[]> => super.delegate('query', 'favoriteShows', args, {}, info),
    users: (args, info): Promise<User[]> => super.delegate('query', 'users', args, {}, info),
    favoriteShow: (args, info): Promise<FavoriteShow | null> => super.delegate('query', 'favoriteShow', args, {}, info),
    user: (args, info): Promise<User | null> => super.delegate('query', 'user', args, {}, info),
    favoriteShowsConnection: (args, info): Promise<FavoriteShowConnection> => super.delegate('query', 'favoriteShowsConnection', args, {}, info),
    usersConnection: (args, info): Promise<UserConnection> => super.delegate('query', 'usersConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createFavoriteShow: (args, info): Promise<FavoriteShow> => super.delegate('mutation', 'createFavoriteShow', args, {}, info),
    createUser: (args, info): Promise<User> => super.delegate('mutation', 'createUser', args, {}, info),
    updateFavoriteShow: (args, info): Promise<FavoriteShow | null> => super.delegate('mutation', 'updateFavoriteShow', args, {}, info),
    updateUser: (args, info): Promise<User | null> => super.delegate('mutation', 'updateUser', args, {}, info),
    deleteFavoriteShow: (args, info): Promise<FavoriteShow | null> => super.delegate('mutation', 'deleteFavoriteShow', args, {}, info),
    deleteUser: (args, info): Promise<User | null> => super.delegate('mutation', 'deleteUser', args, {}, info),
    upsertFavoriteShow: (args, info): Promise<FavoriteShow> => super.delegate('mutation', 'upsertFavoriteShow', args, {}, info),
    upsertUser: (args, info): Promise<User> => super.delegate('mutation', 'upsertUser', args, {}, info),
    updateManyFavoriteShows: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyFavoriteShows', args, {}, info),
    updateManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyUsers', args, {}, info),
    deleteManyFavoriteShows: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyFavoriteShows', args, {}, info),
    deleteManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyUsers', args, {}, info)
  }

  subscription: Subscription = {
    favoriteShow: (args, infoOrQuery): Promise<AsyncIterator<FavoriteShowSubscriptionPayload>> => super.delegateSubscription('favoriteShow', args, {}, infoOrQuery),
    user: (args, infoOrQuery): Promise<AsyncIterator<UserSubscriptionPayload>> => super.delegateSubscription('user', args, {}, infoOrQuery)
  }
}