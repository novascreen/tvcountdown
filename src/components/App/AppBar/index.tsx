import * as React from 'react';
import { Fragment } from 'react';
import { compose } from 'react-apollo';
import MUIAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid/Grid';
import Typography from 'material-ui/Typography/Typography';
import withWidth, { WithWidthProps } from 'material-ui/utils/withWidth';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { Theme } from 'material-ui/styles/createMuiTheme';

import Navigation from 'components/App/Navigation';
import Search from 'components/App/Search';
import Box from 'components/UI/Box';

const styles = (theme: Theme) => ({
  '@global': {
    html: {
      overflowX: 'hidden',
    },
  },
  root: {
    width: '100%',
  },
  spacer: theme.mixins.toolbar,
  flex: {
    flex: 1,
  },
});

type Props = {
};

type PropsWithStyles = WithStyles<'root' | 'spacer' | 'flex'>;

export const AppBar: React.SFC<Props & PropsWithStyles & WithWidthProps> = ({
  classes,
  width,
}) => {
  const smallScreen = width === 'xs';
  return (
    <Fragment>
      <MUIAppBar position="fixed">
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Grid container alignItems="center">
                <Box mR={2}>
                  <Typography type="title" color="inherit">TVEpisodes</Typography>
                </Box>
                {!smallScreen &&
                  <Navigation
                    position="top"
                  />
                }
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" justify="flex-end">
                <Search />
                <Button color="inherit">Login</Button>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </MUIAppBar>
      <div className={classes.spacer} />
      {smallScreen &&
        <Navigation
          position="bottom"
        />
      }
    </Fragment>
  );
};

export default compose(
  withStyles(styles),
  withWidth(),
)(AppBar);
