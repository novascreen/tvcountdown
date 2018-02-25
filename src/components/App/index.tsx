import * as React from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Grid from 'material-ui/Grid/Grid';

import withRoot from 'withRoot';
import ScrollToTop from 'components/Util/ScrollToTop';
import Schedule from 'components/Pages/Schedule';
import Favorites from 'components/Pages/Favorites';
import Show from 'components/Pages/Show';
import Episode from 'components/Pages/Episode';
import Box from 'components/UI/Box';
import AppBar from './AppBar';
import Footer from './Footer';

export const App = () => (
  <Router>
    <ScrollToTop>
      <Fragment>
        <AppBar />
        <main style={{ minHeight: '100vh' }}>
          <Box mT={2} pH={1}>
            <Grid container justify="center">
              <Grid item style={{ width: '100%', maxWidth: 800 }}>
                <Route exact path="/" component={Schedule} />
                <Route exact path="/favorites" component={Favorites} />
                <Route exact path="/shows/:showId" component={Show} />
                <Route
                  exact
                  path="/shows/:showId/episodes/:episodeId"
                  component={Episode}
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
