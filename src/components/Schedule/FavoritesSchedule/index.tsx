import * as React from 'react';
import { graphql, compose } from 'react-apollo';

import FavoritesList from 'components/Schedule/FavoritesList';
import { GET_FAVORITES, Favorites } from 'resolvers/favorites';
import withMyFavoriteShows from 'graphql/withMyFavoriteShows';
import { User } from 'graphql/types';

type InputProps = {
  previous?: boolean;
};

type Response = {
  favorites?: Favorites;
  me?: User;
  loadingMyFavoriteShows?: boolean;
};

export const FavoritesSchedule: React.SFC<InputProps & Response> = ({
  me,
  loadingMyFavoriteShows,
  previous,
  ...props
}) => {
  let { favorites = [] } = props;
  const favoriteShows = (me && me.favoriteShows) || [];
  if (loadingMyFavoriteShows || me) {
    favorites = favoriteShows
      .map(show => show.tvmaze || -1)
      .filter(show => show !== -1);
  }
  return <FavoritesList showIds={favorites} previous={previous} />;
};

export default compose(
  withMyFavoriteShows,
  graphql<InputProps, Response>(GET_FAVORITES, {
    props: ({ data }) => ({ ...data }),
  }),
)(FavoritesSchedule);
