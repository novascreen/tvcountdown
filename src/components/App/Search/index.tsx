import * as React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import IconButton from 'material-ui/IconButton/IconButton';
import withStyles, {
  WithStyles,
  StyleRules,
} from 'material-ui/styles/withStyles';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Slide from 'material-ui/transitions/Slide';
import { compose } from 'react-apollo';
import Grid from 'material-ui/Grid/Grid';
import { Theme } from 'material-ui/styles';
import { Input } from 'material-ui';
import { withRouter, RouteComponentProps } from 'react-router';

import Box from 'components/UI/Box';

type Styles = 'search' | 'autoSuggestBox';

const styles = (theme: Theme): StyleRules<Styles> => ({
  search: {
    position: 'absolute',
    width: '100%',
    top: 0,
    right: 0,
    zIndex: 1,
    background: theme.palette.background.paper,
    ...theme.mixins.toolbar,
  },
  autoSuggestBox: {
    flexGrow: 1,
  },
});

type State = {
  open: boolean;
  value: string;
};

export class Search extends React.Component<
  WithStyles<Styles> & RouteComponentProps<{}>,
  State
> {
  state = {
    open: false,
    value: '',
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      value: '',
    });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.currentTarget.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.handleClose();
    this.props.history.push(`/shows?search=${this.state.value}`);
  };

  render() {
    const { classes } = this.props;
    const { open, value } = this.state;
    return (
      <>
        <IconButton color="inherit" onClick={this.handleOpen}>
          <SearchIcon />
        </IconButton>
        <Slide direction="left" in={open}>
          <ClickAwayListener onClickAway={this.handleClose}>
            <Grid
              className={classes.search}
              container
              justify="space-between"
              alignItems="center"
            >
              <Box mL={2} className={classes.autoSuggestBox}>
                {open && (
                  <form onSubmit={this.handleSubmit}>
                    <Input
                      value={value}
                      onChange={this.handleChange}
                      placeholder="Search all shows"
                      autoFocus
                      fullWidth
                    />
                  </form>
                )}
              </Box>
              <IconButton onClick={this.handleClose}>
                <Close />
              </IconButton>
            </Grid>
          </ClickAwayListener>
        </Slide>
      </>
    );
  }
}

export default compose(withStyles(styles), withRouter)(Search);
