import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const Footer = () => {
  const year = new Date().getFullYear();
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
    </footer>
  );
};

export default Footer;
