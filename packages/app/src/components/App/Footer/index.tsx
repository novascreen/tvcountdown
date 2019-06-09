import React from 'react';
import compose from 'recompose/compose';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import withStyles, {
  WithStyles,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';

type Props = {};

export const Footer: React.SFC<Props & WithStyles<Styles> & WithWidth> = ({
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
              <a href="https://tvcountdown.info" rel="noopener noreferrer">
                tvcountdown.info
              </a>
            </Typography>{' '}
            |{' '}
            <Typography color="inherit" component="span" variant="body2">
              <a
                href="https://github.com/novascreen/tvcountdown/issues"
                rel="noopener noreferrer"
              >
                Feedback
              </a>
            </Typography>{' '}
            | Data source:{' '}
            <Typography color="inherit" component="span" variant="body2">
              <a href="https://tvmaze.com" rel="noopener noreferrer">
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

export default compose<any, any>(
  withStyles(styles),
  withWidth(),
)(Footer);
