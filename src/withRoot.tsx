import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import pink from 'material-ui/colors/pink';
import Reboot from 'material-ui/Reboot';
import { IntlProvider } from 'react-intl';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
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
});

function withRoot(Component: React.ComponentType) {
  function WithRoot(props: object) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <IntlProvider locale={navigator.language}>
        <MuiThemeProvider theme={theme}>
          {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
          <Reboot />
          <Component {...props} />
        </MuiThemeProvider>
      </IntlProvider>
    );
  }

  return WithRoot;
}

export default withRoot;