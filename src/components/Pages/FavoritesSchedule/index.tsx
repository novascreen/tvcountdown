import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';

import FavoritesList from 'components/Schedule/FavoritesList';
import { GET_FAVORITES, Favorites } from 'resolvers/favorites';

type InputProps = {};

type Response = {
  favorites?: Favorites;
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

export const AllShowsSchedulePage: React.SFC<InputProps & Response> = ({
  favorites = [],
}) => <FavoritesList showIds={favorites} />;

export default graphql<QueryProps, InputProps, Response>(GET_FAVORITES, {
  props: ({ data }) => ({ ...data }),
})(AllShowsSchedulePage);
