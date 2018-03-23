import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';

import { Episode } from 'api/models';
import Loading from 'components/UI/Loading';
import EpisodesList from 'components/Episodes/List';

type InputProps = {
  showIds: number[];
  previous?: boolean;
};

type Response = {
  scheduleFavorites?: Episode[];
};

type MyQueryProps = {
  error?: Error;
  loading?: boolean;
};

export const FavoritesList: React.SFC<MyQueryProps & InputProps & Response> = ({
  error,
  loading = false,
  scheduleFavorites = [],
}) => {
  if (loading) {
    return <Loading />;
  }
  if (error || !scheduleFavorites) {
    return <h1>ERROR</h1>;
  }
  return <EpisodesList episodes={scheduleFavorites} />;
};

const GET_EPISODES = gql`
  query GetEpisodes($showIds: [Int]!, $previous: Boolean) {
    scheduleFavorites(showIds: $showIds, previous: $previous) {
      id
      name
      season
      number
      airstamp
      show {
        id
        name
      }
    }
  }
`;

export default graphql<QueryProps, InputProps, Response>(GET_EPISODES, {
  options: ({ showIds, previous }) => ({
    variables: { showIds, previous },
  }),
  props: ({ data }) => ({ ...data }),
})(FavoritesList);
