import * as React from 'react';
import { Fragment } from 'react';
import { compose } from 'react-apollo';
import MUIAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid/Grid';
import Typography from 'material-ui/Typography/Typography';
import withWidth, { WithWidthProps } from 'material-ui/utils/withWidth';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { Theme } from 'material-ui/styles/createMuiTheme';

import Navigation from 'components/App/Navigation';
import Search from 'components/App/Search';
import Box from 'components/UI/Box';
import Login from '../Login';
import { Link } from 'react-router-dom';

const styles: any = (theme: Theme) => ({
  '@global': {
    html: {
      overflowX: 'hidden',
    },
    p: {
      marginTop: 0,
      marginBottom: theme.spacing.unit,
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
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

type Props = {};

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
          <Grid
            container
            alignItems="center"
            justify="space-between"
            spacing={16}
          >
            <Grid item>
              <Grid container alignItems="center" spacing={16}>
                <Box mR={2}>
                  <Link to="/">
                    <Typography variant="title" color="inherit">
                      TVCountdown
                    </Typography>
                  </Link>
                </Box>
                {!smallScreen && <Navigation position="top" />}
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                alignItems="center"
                justify="flex-end"
                spacing={16}
              >
                <Search />
                <Login />
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </MUIAppBar>
      <div className={classes.spacer} />
      {smallScreen && <Navigation position="bottom" />}
    </Fragment>
  );
};

export default compose(withStyles(styles), withWidth())(AppBar);
