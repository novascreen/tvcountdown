import * as React from 'react';
import MUIAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import Box from '../Box';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

type PropsWithStyles = WithStyles<'root' | 'flex'>;

const AppBar = (
  withStyles(styles)
)<{}>(({ classes }: PropsWithStyles) => {
  return (
    <div className={classes.root}>
      <MUIAppBar position="static">
        <Toolbar>
          <Box mL={-1.5} mR={2.5}>
            <IconButton color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography type="title" color="inherit" className={classes.flex}>
            Title
          </Typography>
          <Button color="contrast">Login</Button>
        </Toolbar>
      </MUIAppBar>
    </div>
  );
});

export default AppBar;
