import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import { Show as ShowType } from 'models/graphql';
import { Loading } from 'components/UI/Loading';
import Box from 'components/UI/Box';
import HTML from 'components/Util/HTML';
import FavoriteToggle from 'components/FavoriteToggle';
import Info from './Info';

type RouterParams = {
  showId: string;
};

type InputProps = {};

type Response = {
  show?: ShowType;
};

type MyQueryProps = {
  error?: Error;
  loading?: boolean;
};

export const Show: React.SFC<MyQueryProps & InputProps & Response> = props => {
  console.log(props);
  const { loading, show } = props;
  if (loading) return <Loading />;
  if (!show) return <>Show not found</>;
  return (
    <>
      <Typography variant="headline">
        {show.name} <FavoriteToggle showId={show.id} />
      </Typography>
      <Grid container spacing={0}>
        {show.image && (
          <Box pR={2} style={{ float: 'left' }}>
            <img src={show.image.medium} />
          </Box>
        )}
        <Typography>
          <HTML content={show.summary} />
        </Typography>
        <Info show={show} />
      </Grid>
    </>
  );
};

const GET_SHOW = gql`
  query GetShow($showId: Int!) {
    show(id: $showId) {
      id
      name
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
    }
  }
`;

export default graphql<
  QueryProps,
  InputProps,
  Response,
  RouteComponentProps<RouterParams>
>(GET_SHOW, {
  options: ({ match: { params: { showId } } }) => ({
    variables: { showId: parseInt(showId, 10) },
  }),
  props: ({ data }) => ({ ...data }),
})(Show);
