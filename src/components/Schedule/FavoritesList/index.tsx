import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';

import { Episode } from 'models/graphql';
import Loading from 'components/UI/Loading';
import EpisodesList from 'components/Episodes/List';

type InputProps = {
  showIds: number[];
};

type Response = {
  scheduleFavorites?: Episode[];
};

type MyQueryProps = {
  error?: Error;
  loading?: boolean;
};

export const AllShowsList: React.SFC<MyQueryProps & InputProps & Response> = ({
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
  query GetEpisodes($showIds: [Int]!) {
    scheduleFavorites(showIds: $showIds) {
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
  options: ({ showIds }) => ({
    variables: { showIds },
  }),
  props: ({ data }) => ({ ...data }),
})(AllShowsList);