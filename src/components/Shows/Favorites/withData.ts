import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_FAVORITES } from 'resolvers/favorites';
import withMyFavoriteShows from 'api/withMyFavoriteShows';
import { FavoriteShow } from 'api/models';

const GET_SHOWS = gql`
  query GetShows($ids: [Int]!) {
    shows(ids: $ids) {
      id
      name
    }
  }
`;

export default compose(
  withMyFavoriteShows,
  graphql<any>(GET_FAVORITES, {
    props: ({ data }) => ({ ...data }),
  }),
  graphql<any>(GET_SHOWS, {
    options: ({ me, favorites }: any) => {
      let showIds = favorites || [];
      if (me && me.favoriteShows) {
        showIds = me.favoriteShows.map((s: FavoriteShow) => s.tvmaze);
      }
      return {
        variables: { ids: showIds },
      };
    },
    props: ({ data }) => ({ ...data }),
  }),
);
