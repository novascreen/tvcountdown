import React from 'react';
import { compose } from 'react-apollo';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import withStyles, {
  WithStyles,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

import Navigation from 'components/App/Navigation';
import Search from 'components/App/Search';
import Box from 'components/UI/Box';
import Login from '../Login';

type Props = {};

export const AppBar: React.SFC<Props & WithStyles<Styles> & WithWidth> = ({
  classes,
  width,
}) => {
  const smallScreen = width === 'xs';
  return (
    <>
      <MUIAppBar position="fixed">
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            spacing={2}
          >
            <Grid item>
              <Grid container alignItems="center" spacing={2}>
                <Box mr={2}>
                  <Link to="/">
                    <Typography variant="h6" color="inherit">
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
                spacing={2}
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
    </>
  );
};

type Styles = 'root' | 'spacer' | 'flex';

const styles: StyleRulesCallback<Styles> = theme => ({
  '@global': {
    html: {
      overflowX: 'hidden',
    },
    p: {
      marginTop: 0,
      marginBottom: theme.spacing(1),
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

export default compose(
  withStyles(styles),
  withWidth(),
)(AppBar);
