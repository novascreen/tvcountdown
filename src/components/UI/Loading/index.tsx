import * as React from 'react';
import Grid, { GridProps } from 'material-ui/Grid';
import CircularProgress from 'material-ui/Progress/CircularProgress';

export const Loading: React.SFC<GridProps> = ({
  justify = 'center',
  ...props
}) => (
  <Grid container justify={justify} {...props}>
    <CircularProgress />
  </Grid>
);

export default Loading;
