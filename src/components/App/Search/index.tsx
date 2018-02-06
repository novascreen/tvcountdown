import * as React from 'react';
import { Fragment } from 'react';
import SearchIcon from 'material-ui-icons/Search';
import Close from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton/IconButton';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Slide from 'material-ui/transitions/Slide';
import { compose } from 'react-apollo';
import Grid from 'material-ui/Grid/Grid';

// import Box from 'components/UI/Box';
import AutoSuggest from './AutoSuggest';

const styles = (theme: any) => ({
  search: {
    position: 'absolute',
    width: '100%',
    top: 0,
    right: 0,
    zIndex: 1,
    background: theme.palette.primary.main,
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
          <Slide direction="left" in={open}>
            <ClickAwayListener onClickAway={() => null}>
              <Grid
                className={classes.search}
                container
                justify="space-between"
                alignItems="center"
                spacing={0}
              >
                <AutoSuggest />
                <IconButton
                  color="inherit"
                  onClick={this.handleClose}
                >
                  <Close />
                </IconButton>
              </Grid>
            </ClickAwayListener>
          </Slide>
      </Fragment>
    );
  }
}

export default compose(
  withStyles(styles)
)(Search);
