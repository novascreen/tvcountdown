import * as React from 'react';
import { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Grid from 'material-ui/Grid/Grid';

import withRoot from 'withRoot';
import ScrollToTop from 'components/ScrollToTop';
import Schedule from 'components/Pages/Schedule';
import Favorites from 'components/Pages/Favorites';
import AppBar from './AppBar';

export const App = () => (
  <Router>
    <ScrollToTop>
      <Fragment>
        <AppBar />
        <main>
          <Grid container justify="center">
            <Grid item  style={{ width: '100%', maxWidth: 800 }}>
              <Route exact path="/" component={Schedule} />
              <Route exact path="/favorites" component={Favorites} />
            </Grid>
          </Grid>
        </main>
      </Fragment>
    </ScrollToTop>
  </Router>
);

export default withRoot(App);
