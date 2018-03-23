import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';

import { Episode } from 'api/models';
import Loading from 'components/UI/Loading';
import EpisodesList from 'components/Episodes/List';

type InputProps = {
  previous?: boolean;
};

type Response = {
  scheduleAll?: Episode[];
};

type MyQueryProps = {
  error?: Error;
  loading?: boolean;
};

export const AllShowsList: React.SFC<MyQueryProps & InputProps & Response> = ({
  error,
  loading = false,
  scheduleAll = [],
}) => {
  if (loading) {
    return <Loading />;
  }
  if (error || !scheduleAll) {
    return <h1>ERROR</h1>;
  }
  return <EpisodesList episodes={scheduleAll} />;
};

const GET_EPISODES = gql`
  query GetEpisodes($previous: Boolean!) {
    scheduleAll(previous: $previous) {
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
  options: ({ previous }) => ({
    variables: { previous },
  }),
  props: ({ data }) => ({ ...data }),
})(AllShowsList);
