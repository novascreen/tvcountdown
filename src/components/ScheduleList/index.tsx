import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';

import { Episode } from 'models/graphql';
import Loading from 'components/UI/Loading';
import EpisodeList from 'components/EpisodeList';

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

export const ScheduleList: React.SFC<MyQueryProps & InputProps & Response> = ({
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
  return <EpisodeList episodes={scheduleByDate} />;
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
})(ScheduleList);
