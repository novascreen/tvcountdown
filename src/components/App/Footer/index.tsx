import * as React from 'react';
import { compose } from 'react-apollo';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Theme } from 'material-ui/styles/createMuiTheme';
import withWidth, { WithWidthProps } from 'material-ui/utils/withWidth';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';

const styles = (theme: Theme) => ({
  spacer: theme.mixins.toolbar,
});

type Props = {};

type PropsWithStyles = WithStyles<'spacer'>;

export const Footer: React.SFC<Props & PropsWithStyles & WithWidthProps> = ({
  classes,
  width,
}) => {
  const year = new Date().getFullYear();
  const smallScreen = width === 'xs';
  return (
    <footer>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit">
            Copyright © {year}{' '}
            <Typography color="inherit" component="span" variant="body2">
              <a href="https://tvcountdown.info" target="_blank">
                tvcountdown.info
              </a>
            </Typography>{' '}
            | Data source:{' '}
            <Typography color="inherit" component="span" variant="body2">
              <a href="https://tvmaze.com" target="_blank">
                TVmaze
              </a>
            </Typography>
          </Typography>
        </Toolbar>
      </AppBar>
      {smallScreen && <div className={classes.spacer} />}
    </footer>
  );
};

export default compose(withStyles(styles), withWidth())(Footer);
