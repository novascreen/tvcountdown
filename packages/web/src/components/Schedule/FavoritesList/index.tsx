import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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

class EpisodesQuery extends Query<Data, Variables> {}

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
        image {
          medium
        }
      }
    }
  }
`;

type Props = {} & Variables;

export const FavoritesList: React.SFC<Props> = ({ showIds, previous }) => (
  <EpisodesQuery query={GET_EPISODES} variables={{ showIds, previous }}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (!data || !data.scheduleFavorites) return <>Episodes not found</>;
      return <EpisodesList episodes={data.scheduleFavorites} />;
    }}
  </EpisodesQuery>
);

export default FavoritesList;
