import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Episode } from 'graphql/types';
import Loading from 'components/UI/Loading';
import EpisodesList from 'components/Episodes/List';
import Typography from '@material-ui/core/Typography';

interface Data {
  scheduleAll: Episode[];
}

interface Variables {
  previous?: boolean;
}

const GET_SCHEDULE_ALL = gql`
  query GetScheduleAll($previous: Boolean!) {
    scheduleAll(previous: $previous) {
      id
      name
      season
      number
      airstamp
      show {
        id
        name
        image {
          medium
        }
      }
    }
  }
`;

type Props = {} & Variables;

export const AllShowsList: React.SFC<Props> = ({ previous }) => (
  <Query<Data, Variables> query={GET_SCHEDULE_ALL} variables={{ previous }}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (!data || !data.scheduleAll) {
        return <Typography>Episodes not found</Typography>;
      }
      return <EpisodesList episodes={data.scheduleAll} />;
    }}
  </Query>
);

export default AllShowsList;
