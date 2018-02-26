import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';

import { Episode } from 'models/graphql';
import Loading from 'components/UI/Loading';
import EpisodesList from 'components/Episodes/List';

type InputProps = {
  date: string;
};

type Response = {
  scheduleByDate?: Episode[];
};

type MyQueryProps = {
  error?: Error;
  loading?: boolean;
};

export const AllShowsList: React.SFC<MyQueryProps & InputProps & Response> = ({
  error,
  loading = false,
  scheduleByDate = [],
}) => {
  if (loading) {
    return <Loading />;
  }
  if (error || !scheduleByDate) {
    return <h1>ERROR</h1>;
  }
  return <EpisodesList episodes={scheduleByDate} />;
};

const GET_EPISODES = gql`
  query GetEpisodes($date: String!) {
    scheduleByDate(date: $date) {
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
  options: ({ date }) => ({
    variables: { date },
  }),
  props: ({ data }) => ({ ...data }),
})(AllShowsList);
