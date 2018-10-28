import * as React from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Loading: React.SFC<GridProps> = ({
  justify = 'center',
  ...props
}) => (
  <Grid container justify={justify} spacing={16} {...props}>
    <CircularProgress />
  </Grid>
);

export default Loading;
