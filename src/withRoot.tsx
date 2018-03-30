import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import { IntlProvider } from 'react-intl';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import * as R from 'ramda';

import Auth, { isAuthenticated } from './lib/Auth';
import favorites from './resolvers/favorites';

const cache = new InMemoryCache();

const stateLink = withClientState({
  ...R.mergeDeepRight(favorites, {}),
  cache,
});
const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: isAuthenticated() && token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, stateLink, httpLink]),
  cache,
});

export const auth = new Auth(
  (result: any) => console.log('auth result', result),
  client,
);

// A theme with custom primary and secondary color.
// It's optional.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#c62828',
      light: '#ff5f52',
      dark: '#8e0000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0277bd',
      light: '#58a5f0',
      dark: '#004c8c',
      contrastText: '#fff',
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiTypography: {
      root: {
        display: null,
      },
    },
  },
});

function withRoot(Component: React.ComponentType) {
  function WithRoot(props: object) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <ApolloProvider client={client}>
        <IntlProvider locale={navigator.language}>
          <MuiThemeProvider theme={theme}>
            {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
            <Reboot />
            <Component {...props} />
          </MuiThemeProvider>
        </IntlProvider>
      </ApolloProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
