import React from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';

import { GetEpisodeQuery, GetEpisodeQueryVariables } from 'graphql/types';
import { Loading } from 'components/UI/Loading';
import EpisodeDetails from 'components/Episodes/Details';
import Typography from '@material-ui/core/Typography';

const GET_EPISODE = gql`
  query GetEpisode($episodeId: Int!) {
    episode(id: $episodeId) {
      id
      name
      summary
      season
      number
      airstamp
      runtime
      image {
        medium
      }
      show {
        id
        name
        airedYears
        genres
      }
    }
  }
`;

type RouterParams = {
  showId: string;
  episodeId: string;
};

type Props = {} & RouteComponentProps<RouterParams>;

export const EpisodeDetailsPage: React.SFC<Props> = ({ match }) => (
  <Query<GetEpisodeQuery, GetEpisodeQueryVariables>
    query={GET_EPISODE}
    variables={{ episodeId: parseInt(match.params.episodeId, 10) }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (!data || !data.episode) {
        return <Typography>Episode not found</Typography>;
      }
      return <EpisodeDetails episode={data.episode} />;
    }}
  </Query>
);

export default EpisodeDetailsPage;
