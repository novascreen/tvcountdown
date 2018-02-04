import * as React from 'react';
import MUIAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';

import Box from 'components/UI/Box';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
};

type PropsWithStyles = WithStyles<'root' | 'flex'>;

export const AppBar: React.SFC<PropsWithStyles> = ({
  classes
}) => {
  return (
    <div className={classes.root}>
      <MUIAppBar position="static">
        <Toolbar>
          <Box mL={-1.5} mR={2.5}>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography type="title" color="inherit" className={classes.flex}>
            Schedule
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </MUIAppBar>
    </div>
  );
};

export default (
  withStyles(styles)
)<{}>(AppBar);
