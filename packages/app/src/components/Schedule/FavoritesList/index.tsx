import React from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';

import { Episode } from 'graphql/types';
import Loading from 'components/UI/Loading';
import EpisodesList from 'components/Episodes/List';

interface Data {
  scheduleFavorites?: Episode[];
}

interface Variables {
  showIds: number[];
  previous?: boolean;
}

const GET_SCHEDULE_FAVORITES = gql`
  query GetScheduleFavorites($showIds: [Int]!, $previous: Boolean) {
    scheduleFavorites(showIds: $showIds, previous: $previous) {
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

export const FavoritesList: React.SFC<Props> = ({ showIds, previous }) => (
  <Query<Data, Variables>
    query={GET_SCHEDULE_FAVORITES}
    variables={{ showIds, previous }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (!data || !data.scheduleFavorites) {
        return <Typography>Episodes not found</Typography>;
      }
      if (!data.scheduleFavorites.length) {
        return <Typography>You haven't saved any shows yet</Typography>;
      }
      return <EpisodesList episodes={data.scheduleFavorites} />;
    }}
  </Query>
);

export default FavoritesList;
