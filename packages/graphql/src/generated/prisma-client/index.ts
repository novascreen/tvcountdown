// Code generated by Prisma (prisma@1.24.0). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export interface Exists {
  favoriteShow: (where?: FavoriteShowWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  favoriteShow: (where: FavoriteShowWhereUniqueInput) => FavoriteShowPromise;
  favoriteShows: (
    args?: {
      where?: FavoriteShowWhereInput;
      orderBy?: FavoriteShowOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<FavoriteShow>;
  favoriteShowsConnection: (
    args?: {
      where?: FavoriteShowWhereInput;
      orderBy?: FavoriteShowOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FavoriteShowConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserPromise;
  users: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<User>;
  usersConnection: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createFavoriteShow: (data: FavoriteShowCreateInput) => FavoriteShowPromise;
  updateFavoriteShow: (
    args: { data: FavoriteShowUpdateInput; where: FavoriteShowWhereUniqueInput }
  ) => FavoriteShowPromise;
  updateManyFavoriteShows: (
    args: {
      data: FavoriteShowUpdateManyMutationInput;
      where?: FavoriteShowWhereInput;
    }
  ) => BatchPayloadPromise;
  upsertFavoriteShow: (
    args: {
      where: FavoriteShowWhereUniqueInput;
      create: FavoriteShowCreateInput;
      update: FavoriteShowUpdateInput;
    }
  ) => FavoriteShowPromise;
  deleteFavoriteShow: (
    where: FavoriteShowWhereUniqueInput
  ) => FavoriteShowPromise;
  deleteManyFavoriteShows: (
    where?: FavoriteShowWhereInput
  ) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (
    args: { data: UserUpdateInput; where: UserWhereUniqueInput }
  ) => UserPromise;
  updateManyUsers: (
    args: { data: UserUpdateManyMutationInput; where?: UserWhereInput }
  ) => BatchPayloadPromise;
  upsertUser: (
    args: {
      where: UserWhereUniqueInput;
      create: UserCreateInput;
      update: UserUpdateInput;
    }
  ) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  favoriteShow: (
    where?: FavoriteShowSubscriptionWhereInput
  ) => FavoriteShowSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type FavoriteShowOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "tvmaze_ASC"
  | "tvmaze_DESC"
  | "tvrage_ASC"
  | "tvrage_DESC"
  | "thetvdb_ASC"
  | "thetvdb_DESC"
  | "imdb_ASC"
  | "imdb_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "auth0id_ASC"
  | "auth0id_DESC"
  | "identity_ASC"
  | "identity_DESC"
  | "email_ASC"
  | "email_DESC"
  | "name_ASC"
  | "name_DESC"
  | "avatar_ASC"
  | "avatar_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface UserUpdateOneWithoutFavoriteShowsInput {
  create?: UserCreateWithoutFavoriteShowsInput;
  update?: UserUpdateWithoutFavoriteShowsDataInput;
  upsert?: UserUpsertWithoutFavoriteShowsInput;
  delete?: Boolean;
  disconnect?: Boolean;
  connect?: UserWhereUniqueInput;
}

export type FavoriteShowWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface FavoriteShowUpdateManyWithoutUserInput {
  create?:
    | FavoriteShowCreateWithoutUserInput[]
    | FavoriteShowCreateWithoutUserInput;
  delete?: FavoriteShowWhereUniqueInput[] | FavoriteShowWhereUniqueInput;
  connect?: FavoriteShowWhereUniqueInput[] | FavoriteShowWhereUniqueInput;
  disconnect?: FavoriteShowWhereUniqueInput[] | FavoriteShowWhereUniqueInput;
  update?:
    | FavoriteShowUpdateWithWhereUniqueWithoutUserInput[]
    | FavoriteShowUpdateWithWhereUniqueWithoutUserInput;
  upsert?:
    | FavoriteShowUpsertWithWhereUniqueWithoutUserInput[]
    | FavoriteShowUpsertWithWhereUniqueWithoutUserInput;
  deleteMany?: FavoriteShowScalarWhereInput[] | FavoriteShowScalarWhereInput;
  updateMany?:
    | FavoriteShowUpdateManyWithWhereNestedInput[]
    | FavoriteShowUpdateManyWithWhereNestedInput;
}

export interface UserCreateInput {
  auth0id: String;
  identity?: String;
  email: String;
  name: String;
  avatar?: String;
  favoriteShows?: FavoriteShowCreateManyWithoutUserInput;
}

export interface FavoriteShowUpdateManyMutationInput {
  tvmaze?: Int;
  tvrage?: Int;
  thetvdb?: Int;
  imdb?: String;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: UserWhereInput;
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
}

export interface FavoriteShowCreateInput {
  tvmaze: Int;
  tvrage?: Int;
  thetvdb?: Int;
  imdb?: String;
  user?: UserCreateOneWithoutFavoriteShowsInput;
}

export interface UserUpdateManyMutationInput {
  auth0id?: String;
  identity?: String;
  email?: String;
  name?: String;
  avatar?: String;
}

export interface UserCreateOneWithoutFavoriteShowsInput {
  create?: UserCreateWithoutFavoriteShowsInput;
  connect?: UserWhereUniqueInput;
}

export interface FavoriteShowUpdateManyWithWhereNestedInput {
  where: FavoriteShowScalarWhereInput;
  data: FavoriteShowUpdateManyDataInput;
}

export interface UserCreateWithoutFavoriteShowsInput {
  auth0id: String;
  identity?: String;
  email: String;
  name: String;
  avatar?: String;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
  auth0id?: String;
  email?: String;
}>;

export interface FavoriteShowUpdateInput {
  tvmaze?: Int;
  tvrage?: Int;
  thetvdb?: Int;
  imdb?: String;
  user?: UserUpdateOneWithoutFavoriteShowsInput;
}

export interface FavoriteShowUpdateWithoutUserDataInput {
  tvmaze?: Int;
  tvrage?: Int;
  thetvdb?: Int;
  imdb?: String;
}

export interface UserUpdateInput {
  auth0id?: String;
  identity?: String;
  email?: String;
  name?: String;
  avatar?: String;
  favoriteShows?: FavoriteShowUpdateManyWithoutUserInput;
}

export interface UserWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  auth0id?: String;
  auth0id_not?: String;
  auth0id_in?: String[] | String;
  auth0id_not_in?: String[] | String;
  auth0id_lt?: String;
  auth0id_lte?: String;
  auth0id_gt?: String;
  auth0id_gte?: String;
  auth0id_contains?: String;
  auth0id_not_contains?: String;
  auth0id_starts_with?: String;
  auth0id_not_starts_with?: String;
  auth0id_ends_with?: String;
  auth0id_not_ends_with?: String;
  identity?: String;
  identity_not?: String;
  identity_in?: String[] | String;
  identity_not_in?: String[] | String;
  identity_lt?: String;
  identity_lte?: String;
  identity_gt?: String;
  identity_gte?: String;
  identity_contains?: String;
  identity_not_contains?: String;
  identity_starts_with?: String;
  identity_not_starts_with?: String;
  identity_ends_with?: String;
  identity_not_ends_with?: String;
  email?: String;
  email_not?: String;
  email_in?: String[] | String;
  email_not_in?: String[] | String;
  email_lt?: String;
  email_lte?: String;
  email_gt?: String;
  email_gte?: String;
  email_contains?: String;
  email_not_contains?: String;
  email_starts_with?: String;
  email_not_starts_with?: String;
  email_ends_with?: String;
  email_not_ends_with?: String;
  name?: String;
  name_not?: String;
  name_in?: String[] | String;
  name_not_in?: String[] | String;
  name_lt?: String;
  name_lte?: String;
  name_gt?: String;
  name_gte?: String;
  name_contains?: String;
  name_not_contains?: String;
  name_starts_with?: String;
  name_not_starts_with?: String;
  name_ends_with?: String;
  name_not_ends_with?: String;
  avatar?: String;
  avatar_not?: String;
  avatar_in?: String[] | String;
  avatar_not_in?: String[] | String;
  avatar_lt?: String;
  avatar_lte?: String;
  avatar_gt?: String;
  avatar_gte?: String;
  avatar_contains?: String;
  avatar_not_contains?: String;
  avatar_starts_with?: String;
  avatar_not_starts_with?: String;
  avatar_ends_with?: String;
  avatar_not_ends_with?: String;
  favoriteShows_every?: FavoriteShowWhereInput;
  favoriteShows_some?: FavoriteShowWhereInput;
  favoriteShows_none?: FavoriteShowWhereInput;
  AND?: UserWhereInput[] | UserWhereInput;
  OR?: UserWhereInput[] | UserWhereInput;
  NOT?: UserWhereInput[] | UserWhereInput;
}

export interface UserUpdateWithoutFavoriteShowsDataInput {
  auth0id?: String;
  identity?: String;
  email?: String;
  name?: String;
  avatar?: String;
}

export interface FavoriteShowUpdateManyDataInput {
  tvmaze?: Int;
  tvrage?: Int;
  thetvdb?: Int;
  imdb?: String;
}

export interface FavoriteShowCreateManyWithoutUserInput {
  create?:
    | FavoriteShowCreateWithoutUserInput[]
    | FavoriteShowCreateWithoutUserInput;
  connect?: FavoriteShowWhereUniqueInput[] | FavoriteShowWhereUniqueInput;
}

export interface FavoriteShowCreateWithoutUserInput {
  tvmaze: Int;
  tvrage?: Int;
  thetvdb?: Int;
  imdb?: String;
}

export interface FavoriteShowWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  tvmaze?: Int;
  tvmaze_not?: Int;
  tvmaze_in?: Int[] | Int;
  tvmaze_not_in?: Int[] | Int;
  tvmaze_lt?: Int;
  tvmaze_lte?: Int;
  tvmaze_gt?: Int;
  tvmaze_gte?: Int;
  tvrage?: Int;
  tvrage_not?: Int;
  tvrage_in?: Int[] | Int;
  tvrage_not_in?: Int[] | Int;
  tvrage_lt?: Int;
  tvrage_lte?: Int;
  tvrage_gt?: Int;
  tvrage_gte?: Int;
  thetvdb?: Int;
  thetvdb_not?: Int;
  thetvdb_in?: Int[] | Int;
  thetvdb_not_in?: Int[] | Int;
  thetvdb_lt?: Int;
  thetvdb_lte?: Int;
  thetvdb_gt?: Int;
  thetvdb_gte?: Int;
  imdb?: String;
  imdb_not?: String;
  imdb_in?: String[] | String;
  imdb_not_in?: String[] | String;
  imdb_lt?: String;
  imdb_lte?: String;
  imdb_gt?: String;
  imdb_gte?: String;
  imdb_contains?: String;
  imdb_not_contains?: String;
  imdb_starts_with?: String;
  imdb_not_starts_with?: String;
  imdb_ends_with?: String;
  imdb_not_ends_with?: String;
  user?: UserWhereInput;
  AND?: FavoriteShowWhereInput[] | FavoriteShowWhereInput;
  OR?: FavoriteShowWhereInput[] | FavoriteShowWhereInput;
  NOT?: FavoriteShowWhereInput[] | FavoriteShowWhereInput;
}

export interface UserUpsertWithoutFavoriteShowsInput {
  update: UserUpdateWithoutFavoriteShowsDataInput;
  create: UserCreateWithoutFavoriteShowsInput;
}

export interface FavoriteShowScalarWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  tvmaze?: Int;
  tvmaze_not?: Int;
  tvmaze_in?: Int[] | Int;
  tvmaze_not_in?: Int[] | Int;
  tvmaze_lt?: Int;
  tvmaze_lte?: Int;
  tvmaze_gt?: Int;
  tvmaze_gte?: Int;
  tvrage?: Int;
  tvrage_not?: Int;
  tvrage_in?: Int[] | Int;
  tvrage_not_in?: Int[] | Int;
  tvrage_lt?: Int;
  tvrage_lte?: Int;
  tvrage_gt?: Int;
  tvrage_gte?: Int;
  thetvdb?: Int;
  thetvdb_not?: Int;
  thetvdb_in?: Int[] | Int;
  thetvdb_not_in?: Int[] | Int;
  thetvdb_lt?: Int;
  thetvdb_lte?: Int;
  thetvdb_gt?: Int;
  thetvdb_gte?: Int;
  imdb?: String;
  imdb_not?: String;
  imdb_in?: String[] | String;
  imdb_not_in?: String[] | String;
  imdb_lt?: String;
  imdb_lte?: String;
  imdb_gt?: String;
  imdb_gte?: String;
  imdb_contains?: String;
  imdb_not_contains?: String;
  imdb_starts_with?: String;
  imdb_not_starts_with?: String;
  imdb_ends_with?: String;
  imdb_not_ends_with?: String;
  AND?: FavoriteShowScalarWhereInput[] | FavoriteShowScalarWhereInput;
  OR?: FavoriteShowScalarWhereInput[] | FavoriteShowScalarWhereInput;
  NOT?: FavoriteShowScalarWhereInput[] | FavoriteShowScalarWhereInput;
}

export interface FavoriteShowSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: FavoriteShowWhereInput;
  AND?:
    | FavoriteShowSubscriptionWhereInput[]
    | FavoriteShowSubscriptionWhereInput;
  OR?:
    | FavoriteShowSubscriptionWhereInput[]
    | FavoriteShowSubscriptionWhereInput;
  NOT?:
    | FavoriteShowSubscriptionWhereInput[]
    | FavoriteShowSubscriptionWhereInput;
}

export interface FavoriteShowUpdateWithWhereUniqueWithoutUserInput {
  where: FavoriteShowWhereUniqueInput;
  data: FavoriteShowUpdateWithoutUserDataInput;
}

export interface FavoriteShowUpsertWithWhereUniqueWithoutUserInput {
  where: FavoriteShowWhereUniqueInput;
  update: FavoriteShowUpdateWithoutUserDataInput;
  create: FavoriteShowCreateWithoutUserInput;
}

export interface NodeNode {
  id: ID_Output;
}

export interface UserPreviousValues {
  id: ID_Output;
  auth0id: String;
  identity?: String;
  email: String;
  name: String;
  avatar?: String;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  auth0id: () => Promise<String>;
  identity: () => Promise<String>;
  email: () => Promise<String>;
  name: () => Promise<String>;
  avatar: () => Promise<String>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  auth0id: () => Promise<AsyncIterator<String>>;
  identity: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  name: () => Promise<AsyncIterator<String>>;
  avatar: () => Promise<AsyncIterator<String>>;
}

export interface AggregateFavoriteShow {
  count: Int;
}

export interface AggregateFavoriteShowPromise
  extends Promise<AggregateFavoriteShow>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateFavoriteShowSubscription
  extends Promise<AsyncIterator<AggregateFavoriteShow>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface FavoriteShowSubscriptionPayload {
  mutation: MutationType;
  node: FavoriteShow;
  updatedFields: String[];
  previousValues: FavoriteShowPreviousValues;
}

export interface FavoriteShowSubscriptionPayloadPromise
  extends Promise<FavoriteShowSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = FavoriteShowPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = FavoriteShowPreviousValuesPromise>() => T;
}

export interface FavoriteShowSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<FavoriteShowSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = FavoriteShowSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = FavoriteShowPreviousValuesSubscription>() => T;
}

export interface FavoriteShowEdge {
  node: FavoriteShow;
  cursor: String;
}

export interface FavoriteShowEdgePromise
  extends Promise<FavoriteShowEdge>,
    Fragmentable {
  node: <T = FavoriteShowPromise>() => T;
  cursor: () => Promise<String>;
}

export interface FavoriteShowEdgeSubscription
  extends Promise<AsyncIterator<FavoriteShowEdge>>,
    Fragmentable {
  node: <T = FavoriteShowSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface User {
  id: ID_Output;
  auth0id: String;
  identity?: String;
  email: String;
  name: String;
  avatar?: String;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  auth0id: () => Promise<String>;
  identity: () => Promise<String>;
  email: () => Promise<String>;
  name: () => Promise<String>;
  avatar: () => Promise<String>;
  favoriteShows: <T = FragmentableArray<FavoriteShow>>(
    args?: {
      where?: FavoriteShowWhereInput;
      orderBy?: FavoriteShowOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  auth0id: () => Promise<AsyncIterator<String>>;
  identity: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  name: () => Promise<AsyncIterator<String>>;
  avatar: () => Promise<AsyncIterator<String>>;
  favoriteShows: <T = Promise<AsyncIterator<FavoriteShowSubscription>>>(
    args?: {
      where?: FavoriteShowWhereInput;
      orderBy?: FavoriteShowOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface FavoriteShow {
  id: ID_Output;
  tvmaze: Int;
  tvrage?: Int;
  thetvdb?: Int;
  imdb?: String;
}

export interface FavoriteShowPromise
  extends Promise<FavoriteShow>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  tvmaze: () => Promise<Int>;
  tvrage: () => Promise<Int>;
  thetvdb: () => Promise<Int>;
  imdb: () => Promise<String>;
  user: <T = UserPromise>() => T;
}

export interface FavoriteShowSubscription
  extends Promise<AsyncIterator<FavoriteShow>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  tvmaze: () => Promise<AsyncIterator<Int>>;
  tvrage: () => Promise<AsyncIterator<Int>>;
  thetvdb: () => Promise<AsyncIterator<Int>>;
  imdb: () => Promise<AsyncIterator<String>>;
  user: <T = UserSubscription>() => T;
}

export interface FavoriteShowConnection {
  pageInfo: PageInfo;
  edges: FavoriteShowEdge[];
}

export interface FavoriteShowConnectionPromise
  extends Promise<FavoriteShowConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<FavoriteShowEdge>>() => T;
  aggregate: <T = AggregateFavoriteShowPromise>() => T;
}

export interface FavoriteShowConnectionSubscription
  extends Promise<AsyncIterator<FavoriteShowConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<FavoriteShowEdgeSubscription>>>() => T;
  aggregate: <T = AggregateFavoriteShowSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface FavoriteShowPreviousValues {
  id: ID_Output;
  tvmaze: Int;
  tvrage?: Int;
  thetvdb?: Int;
  imdb?: String;
}

export interface FavoriteShowPreviousValuesPromise
  extends Promise<FavoriteShowPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  tvmaze: () => Promise<Int>;
  tvrage: () => Promise<Int>;
  thetvdb: () => Promise<Int>;
  imdb: () => Promise<String>;
}

export interface FavoriteShowPreviousValuesSubscription
  extends Promise<AsyncIterator<FavoriteShowPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  tvmaze: () => Promise<AsyncIterator<Int>>;
  tvrage: () => Promise<AsyncIterator<Int>>;
  thetvdb: () => Promise<AsyncIterator<Int>>;
  imdb: () => Promise<AsyncIterator<String>>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type Long = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "FavoriteShow",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
export const prisma = new Prisma();