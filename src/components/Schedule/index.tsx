import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';
import { Episode } from '../../models/graphql';
import { EpisodeList } from '../EpisodeList/index';

type InputProps = {
  date: string;
};

type Response = {
  scheduleByDate: Episode[];
};

export const Schedule: React.SFC<QueryProps & InputProps & Response> = ({
  loading, error, scheduleByDate
}) => {
  if (loading) { return <div>Loading</div>; }
  if (error || !scheduleByDate) { return <h1>ERROR</h1>; }
  return (
    <EpisodeList episodes={scheduleByDate} />
  );
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
        name
      }
    }
  }
`;

export default graphql<QueryProps, InputProps, Response>(GET_EPISODES, {
  options: ({ date }) => ({
    variables: { date }
  }),
  props: ({ data }) => ({ ...data })
})(Schedule);
