import * as React from 'react';
import { Fragment } from 'react';
import { Route } from 'react-router';
import Grid from 'material-ui/Grid/Grid';

import ScrollToTop from 'components/Util/ScrollToTop';
import CountdownPage from 'components/Pages/Countdown';
import ShowDetailsPage from 'components/Pages/ShowDetails';
import EpisodeDetailsPage from 'components/Pages/EpisodeDetails';
import Box from 'components/UI/Box';
import AppBar from './AppBar';
import Footer from './Footer';

const App = () => (
  <ScrollToTop>
    <Fragment>
      <AppBar />
      <main style={{ minHeight: '100vh' }}>
        <Box mT={2} pH={1}>
          <Grid container justify="center">
            <Grid item style={{ width: '100%', maxWidth: 800 }}>
              <Route exact path="/" component={CountdownPage} />
              <Route exact path="/shows/:showId" component={ShowDetailsPage} />
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
);

export default App;
