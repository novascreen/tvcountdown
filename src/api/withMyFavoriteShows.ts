import { graphql, QueryProps, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withProps } from 'recompose';

import { isAuthenticated } from 'lib/Auth';
import fragments from './fragments';

const GET_MY_FAVORITE_SHOWS = gql`
  query GetMyFavoriteShows {
    me {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

const withMyFavoriteShows = compose(
  withProps(() => ({ auth: isAuthenticated() })),
  graphql<QueryProps, any, Response>(GET_MY_FAVORITE_SHOWS, {
    skip: ({ auth }) => !auth,
    props: ({ data }) => ({
      ...data,
      loadingMyFavoriteShows: data && data.loading,
    }),
  }),
);

export default withMyFavoriteShows;
