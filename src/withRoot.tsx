import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import pink from 'material-ui/colors/pink';
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

import Auth from './lib/Auth';
import favorites from './resolvers/favorites';

const cache = new InMemoryCache();

const stateLink = withClientState({
  ...R.mergeDeepRight(favorites, {}),
  cache,
});
const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
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
      light: teal[300],
      main: teal[500],
      dark: teal[700],
    },
    secondary: {
      light: pink[300],
      main: pink[500],
      dark: pink[700],
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
