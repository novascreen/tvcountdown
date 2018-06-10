import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';

import { Episode as EpisodeType } from 'graphql/types';
import { Loading } from 'components/UI/Loading';
import EpisodeDetails from 'components/Episodes/Details';
import Typography from '@material-ui/core/Typography';

interface Data {
  episode: EpisodeType;
}

interface Variables {
  episodeId: number;
}

class EpisodeQuery extends Query<Data, Variables> {}

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
  <EpisodeQuery
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
  </EpisodeQuery>
);

export default EpisodeDetailsPage;
