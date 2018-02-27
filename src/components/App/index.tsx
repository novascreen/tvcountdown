import * as React from 'react';
import { Fragment } from 'react';
import { Router, Route } from 'react-router';
import Grid from 'material-ui/Grid/Grid';

import withRoot from 'withRoot';
import appHistory from 'appHistory';
import auth from 'auth';
import ScrollToTop from 'components/Util/ScrollToTop';
import AllShowsSchedulePage from 'components/Pages/AllShowsSchedule';
import FavoritesSchedulePage from 'components/Pages/FavoritesSchedule';
import ShowDetailsPage from 'components/Pages/ShowDetails';
import EpisodeDetailsPage from 'components/Pages/EpisodeDetails';
import Box from 'components/UI/Box';
import { Loading } from 'components/UI/Loading';
import AppBar from './AppBar';
import Footer from './Footer';

const handleAuthentication = ({ location }: any) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const App = () => (
  <Router history={appHistory}>
    <ScrollToTop>
      <Fragment>
        <AppBar />
        <main style={{ minHeight: '100vh' }}>
          <Box mT={2} pH={1}>
            <Grid container justify="center">
              <Grid item style={{ width: '100%', maxWidth: 800 }}>
                <Route
                  exact
                  path="/callback"
                  render={props => {
                    handleAuthentication(props);
                    return <Loading />;
                  }}
                />
                <Route exact path="/" component={AllShowsSchedulePage} />
                <Route
                  exact
                  path="/favorites"
                  component={FavoritesSchedulePage}
                />
                <Route
                  exact
                  path="/shows/:showId"
                  component={ShowDetailsPage}
                />
                <Route
                  exact
                  path="/shows/:showId/episodes/:episodeId"
                  component={EpisodeDetailsPage}
                />
              </Grid>
            </Grid>
          </Box>
        </main>
        <Footer />
      </Fragment>
    </ScrollToTop>
  </Router>
);

export default withRoot(App);
