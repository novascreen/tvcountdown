import * as React from 'react';
import { Router, Switch, Route } from 'react-router';

import withRoot, { auth } from 'withRoot';
import appHistory from 'appHistory';
import { Loading } from 'components/UI/Loading';
import App from './App';

const handleAuthentication = ({ location }: any) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const AppContainer = () => (
  <Router history={appHistory}>
    <Switch>
      <Route
        exact
        path="/auth/popup"
        render={props => {
          auth.auth0.popup.callback();
          return <Loading />;
        }}
      />
      <Route
        exact
        path="/auth/callback"
        render={props => {
          handleAuthentication(props);
          return <Loading />;
        }}
      />
      <Route component={App} />
    </Switch>
  </Router>
);

export default withRoot(AppContainer);
