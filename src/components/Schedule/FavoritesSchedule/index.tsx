import * as React from 'react';
import { graphql, QueryProps, compose } from 'react-apollo';

import FavoritesList from 'components/Schedule/FavoritesList';
import { GET_FAVORITES, Favorites } from 'resolvers/favorites';
import withMyFavoriteShows from 'api/withMyFavoriteShows';
import { User } from 'api/models';

type InputProps = {};

type Response = {
  favorites?: Favorites;
  me?: User;
  loadingMyFavoriteShows?: boolean;
};

// export class AllShowsSchedulePage extends React.Component<Props> {
//   static defaultProps = {
//     favorites: [],
//   };
//   render() {
//     const { favorites } = this.props;
//     return <FavoritesList showIds={favorites} />;
//   }
// }

export const FavoritesSchedule: React.SFC<InputProps & Response> = ({
  me,
  loadingMyFavoriteShows,
  ...props
}) => {
  let { favorites = [] } = props;
  const favoriteShows = (me && me.favoriteShows) || [];
  if (loadingMyFavoriteShows || me) {
    favorites = favoriteShows
      .map(show => show.tvmaze || -1)
      .filter(show => show !== -1);
  }
  return <FavoritesList showIds={favorites} />;
};

export default compose(
  withMyFavoriteShows,
  graphql<QueryProps, InputProps, Response>(GET_FAVORITES, {
    props: ({ data }) => ({ ...data }),
  }),
)(FavoritesSchedule);
