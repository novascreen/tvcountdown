import * as React from 'react';
import { Fragment } from 'react';
import SearchIcon from 'material-ui-icons/Search';
import Close from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton/IconButton';
import Snackbar from 'material-ui/Snackbar/Snackbar';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';

const styles = (theme: any) => ({
  search: {
    position: 'absolute',
    width: '100vw',
    height: 'auto',
    top: 0,
    left: 0,
    right: 0,
    ...theme.mixins.toolbar,
  },
});

type PropsWithStyles = WithStyles<'search'>;

export class Search extends React.Component<PropsWithStyles> {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
  }
  handleClose = () => {
    this.setState({
      open: false,
    });
  }
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <Fragment>
        <IconButton color="inherit" onClick={this.handleOpen}>
          <SearchIcon />
        </IconButton>
        <Snackbar
          className={classes.search}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          message={(
            <Fragment>
              Hello
              <IconButton
                onClick={this.handleClose}
              >
                <Close />
              </IconButton>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default (
  withStyles(styles)
)<{}>(Search);
