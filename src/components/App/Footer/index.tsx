import * as React from 'react';
import { compose } from 'react-apollo';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withWidth, { WithWidthProps } from '@material-ui/core/withWidth';
import withStyles, {
  WithStyles,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';

type Props = {};

export const Footer: React.SFC<Props & WithStyles<Styles> & WithWidthProps> = ({
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

type Styles = 'spacer';

const styles: StyleRulesCallback<Styles> = theme => ({
  spacer: theme.mixins.toolbar,
});

export default compose(
  withStyles(styles),
  withWidth(),
)(Footer);
