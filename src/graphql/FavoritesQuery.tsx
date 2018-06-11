import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import * as uuid from 'uuid/v4';
import { ApolloError } from 'apollo-client';
import withProps from 'recompose/withProps';

import { GET_FAVORITES, Favorites } from 'resolvers/favorites';
import { isAuthenticated } from 'lib/Auth';
import fragments from './fragments';
import { User, FavoriteShow } from './types';

interface Data {
  me: User;
}

interface Variables {}

class MeQuery extends Query<Data, Variables> {}

const GET_MY_FAVORITE_SHOWS = gql`
  query GetMyFavoriteShows {
    me {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

interface FavoritesData {
  favorites: Favorites;
}

interface FavoritesVariables {}

class FavoritesQuery extends Query<FavoritesData, FavoritesVariables> {}

type Result = {
  loading: boolean;
  error: ApolloError | undefined;
  favoriteShows: FavoriteShow[];
  favoriteShowsIds: number[];
  userId: string | undefined;
};
type Props = {
  auth: boolean;
  children: (result: Result) => React.ReactNode;
};

export default withProps(() => ({ auth: isAuthenticated() }))(
  ({ auth, children = () => null }: Props) => (
    <FavoritesQuery query={GET_FAVORITES}>
      {favoritesResult => (
        <MeQuery query={GET_MY_FAVORITE_SHOWS} skip={!auth}>
          {meResult => {
            let favoriteShows: FavoriteShow[] = [];
            let userId;

            // Return locally stored favorites
            if (favoritesResult.data && favoritesResult.data.favorites) {
              favoriteShows = favoritesResult.data.favorites.map(favorite => ({
                id: uuid(),
                tvmaze: favorite,
              }));
            }

            // Return favorites from profile if authenticated
            if (auth && meResult.data && meResult.data.me) {
              userId = meResult.data.me.id;
              favoriteShows = meResult.data.me.favoriteShows;
            }

            const favoriteShowsIds = favoriteShows.map(
              favorite => favorite.tvmaze,
            );

            return children({
              loading: (auth && meResult.loading) || favoritesResult.loading,
              error: meResult.error || favoritesResult.error,
              favoriteShows,
              favoriteShowsIds,
              userId,
            });
          }}
        </MeQuery>
      )}
    </FavoritesQuery>
  ),
);
