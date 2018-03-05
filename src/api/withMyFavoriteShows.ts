import { graphql, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';
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

const withMyFavoriteShows = graphql<QueryProps, any, Response>(
  GET_MY_FAVORITE_SHOWS,
  {
    skip: () => !isAuthenticated(),
    props: ({ data }) => ({
      ...data,
      loadingMyFavoriteShows: data && data.loading,
    }),
  },
);

export default withMyFavoriteShows;
