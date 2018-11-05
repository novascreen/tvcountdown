import * as React from 'react';
import { Route } from 'react-router';
import Grid from '@material-ui/core/Grid/Grid';

import ScrollToTop from 'components/Util/ScrollToTop';
import CountdownPage from 'components/Pages/Countdown';
import ShowsPage from 'components/Pages/Shows';
import ShowDetailsPage from 'components/Pages/ShowDetails';
import EpisodeDetailsPage from 'components/Pages/EpisodeDetails';
import Box from 'components/UI/Box';
import AppBar from './AppBar';
import Footer from './Footer';

const App = () => (
  <ScrollToTop>
    <>
      <AppBar />
      <main style={{ minHeight: '100vh' }}>
        <Box mT={2} pH={1}>
          <Grid container justify="center" spacing={16}>
            <Grid item style={{ width: '100%', maxWidth: 800 }}>
              <Route exact path="/" component={CountdownPage} />
              <Route exact path="/shows" component={ShowsPage} />
              <Route exact path="/shows/:showId" component={ShowDetailsPage} />
              <Route
                exact
                path="/shows/:showId/:section"
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
    </>
  </ScrollToTop>
);

export default App;
