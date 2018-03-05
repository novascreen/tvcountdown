import * as React from 'react';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableRow, TableCell } from 'material-ui/Table';

import { Show } from 'api/models';

type Props = {
  show: Show;
};

export const Info = ({ show }: Props) => (
  <Table>
    <TableBody>
      {show.webChannel && (
        <TableRow style={{ height: 40 }}>
          <TableCell padding="none">
            <Typography>Streamed on:</Typography>
          </TableCell>
          <TableCell>
            <Typography>{show.webChannel.name} (2018 - now)</Typography>
          </TableCell>
        </TableRow>
      )}
      {show.network && (
        <TableRow style={{ height: 40 }}>
          <TableCell padding="none">
            <Typography>Airs on:</Typography>
          </TableCell>
          <TableCell>
            <Typography>{show.network.name} (2018 - now)</Typography>
          </TableCell>
        </TableRow>
      )}
      {show.schedule &&
        show.schedule.time && (
          <TableRow style={{ height: 40 }}>
            <TableCell padding="none">
              <Typography>Schedule:</Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {(show.schedule.days || []).join(', ')} at {show.schedule.time}{' '}
                ({show.runtime} min)
              </Typography>
            </TableCell>
          </TableRow>
        )}
      <TableRow style={{ height: 40 }}>
        <TableCell padding="none">
          <Typography>Status:</Typography>
        </TableCell>
        <TableCell>
          <Typography>{show.status}</Typography>
        </TableCell>
      </TableRow>
      <TableRow style={{ height: 40 }}>
        <TableCell padding="none">
          <Typography>Show Type:</Typography>
        </TableCell>
        <TableCell>
          <Typography>Scripted</Typography>
        </TableCell>
      </TableRow>
      {show.genres && (
        <TableRow style={{ height: 40 }}>
          <TableCell padding="none">
            <Typography>Genres:</Typography>
          </TableCell>
          <TableCell>
            <Typography>{show.genres.join(', ')}</Typography>
          </TableCell>
        </TableRow>
      )}
      {show.officialSite && (
        <TableRow style={{ height: 40 }}>
          <TableCell padding="none">
            <Typography>Official site:</Typography>
          </TableCell>
          <TableCell>
            <a href={show.officialSite}>
              <Typography>{show.officialSite}</Typography>
            </a>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default Info;
