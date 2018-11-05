import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';

import { Show as ShowType } from 'graphql/types';
import { Loading } from 'components/UI/Loading';
import ShowDetails from 'components/Shows/Details';
import Typography from '@material-ui/core/Typography';

interface Data {
  show: ShowType;
}

interface Variables {
  showId: number;
}

class ShowQuery extends Query<Data, Variables> {}

const GET_SHOW = gql`
  query GetShow($showId: Int!) {
    show(id: $showId) {
      id
      name
      airedYears
      summary
      runtime
      genres
      status
      officialSite
      image {
        medium
      }
      network {
        name
      }
      webChannel {
        name
      }
      schedule {
        time
        days
      }
      previousEpisode {
        id
        name
        airstamp
        season
        number
        summary
      }
      nextEpisode {
        id
        name
        airstamp
        season
        number
        summary
      }
    }
  }
`;

type RouterParams = {
  showId: string;
  section: string;
};

type Props = {} & RouteComponentProps<RouterParams>;

export const ShowDetailsPage: React.SFC<Props> = ({ match }) => (
  <ShowQuery
    query={GET_SHOW}
    variables={{ showId: parseInt(match.params.showId, 10) }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (!data || !data.show) return <Typography>Show not found</Typography>;
      return (
        <ShowDetails
          url={match.url}
          section={match.params.section}
          show={data.show}
        />
      );
    }}
  </ShowQuery>
);

export default ShowDetailsPage;
