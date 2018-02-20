import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';
import Typography from 'material-ui/Typography';

import { Show as ShowType } from 'models/graphql';
import { Loading } from 'components/UI/Loading';
import Box from 'components/UI/Box';
import HTML from 'components/Util/HTML';
import FavoriteToggle from 'components/FavoriteToggle';
import Table, { TableBody, TableRow, TableCell } from 'material-ui/Table';
import Grid from 'material-ui/Grid';

type RouterParams = {
  showId: string;
};

type InputProps = {
};

type Response = {
  show?: ShowType;
};

type MyQueryProps = {
  error?: Error,
  loading?: boolean,
};

export const Show: React.SFC<MyQueryProps & InputProps & Response> = (props) => {
  console.log(props);
  const { loading, show } = props;
  if (loading) { return <Loading />; }
  if (!show) { return <>Show not found</>; }
  return (
    <>
      <Typography variant="headline">
        {show.name} <FavoriteToggle showId={show.id}  />
      </Typography>
      <Grid container spacing={0}>
      {show.image &&
        <Box pR={2} style={{ float: 'left' }} >
          <img src={show.image.medium} />
        </Box>
      }
      <Table>
        <TableBody>
          {show.webChannel &&
            <TableRow style={{ height: 40 }}>
              <TableCell><Typography>Streamed on:</Typography></TableCell>
              <TableCell><Typography>{show.webChannel.name} (2018 - now)</Typography></TableCell>
            </TableRow>
          }
          {show.network &&
            <TableRow style={{ height: 40 }}>
              <TableCell><Typography>Airs on:</Typography></TableCell>
              <TableCell><Typography>{show.network.name} (2018 - now)</Typography></TableCell>
            </TableRow>
          }
          {show.schedule && show.schedule.time &&
            <TableRow style={{ height: 40 }}>
              <TableCell><Typography>Schedule:</Typography></TableCell>
              <TableCell>
                <Typography>
                  {(show.schedule.days || []).join(', ')} at{' '}
                  {show.schedule.time} ({show.runtime} min)
                </Typography>
              </TableCell>
            </TableRow>
          }
          <TableRow style={{ height: 40 }}>
            <TableCell><Typography>Status:</Typography></TableCell>
            <TableCell><Typography>{show.status}</Typography></TableCell>
          </TableRow>
          <TableRow style={{ height: 40 }}>
            <TableCell><Typography>Show Type:</Typography></TableCell>
            <TableCell><Typography>Scripted</Typography></TableCell>
          </TableRow>
          {show.genres &&
            <TableRow style={{ height: 40 }}>
              <TableCell><Typography>Genres:</Typography></TableCell>
              <TableCell><Typography>{show.genres.join(', ')}</Typography></TableCell>
            </TableRow>
          }
          {show.officialSite &&
            <TableRow style={{ height: 40 }}>
              <TableCell><Typography>Official site:</Typography></TableCell>
              <TableCell>
                <a href={show.officialSite}>
                  <Typography>{show.officialSite}</Typography>
                </a>
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
      </Grid>
      <Typography>
        <HTML content={show.summary} />
      </Typography>
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

export default graphql<QueryProps, InputProps, Response, RouteComponentProps<RouterParams>>(GET_SHOW, {
  options: ({ match: { params: { showId } } }) => ({
    variables: { showId: parseInt(showId, 10) }
  }),
  props: ({ data }) => ({ ...data })
})(Show);
