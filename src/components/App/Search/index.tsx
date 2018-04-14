import * as React from 'react';
import { Fragment } from 'react';
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
import { withRouter, RouteComponentProps } from 'react-router';

import Box from 'components/UI/Box';
import AutoSuggest from './AutoSuggest';
import { Show } from 'api/models';
import { OnSuggestionSelected } from 'react-autosuggest';

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

export class Search extends React.Component<
  WithStyles<Styles> & RouteComponentProps<{}>
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

  handleSuggestionsFetchRequested = () => {};

  handleSuggestionsClearRequested = () => {
    this.setState({ value: '' });
  };

  handleSuggestionSelected: OnSuggestionSelected<Show> = (
    event,
    { suggestion },
  ) => {
    this.handleClose();
    this.props.history.push(`/shows/${suggestion.id}`);
  };

  handleChange = (e: any) => this.setState({ value: e.target.value });

  render() {
    const { classes } = this.props;
    const { open, value } = this.state;
    return (
      <Fragment>
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
                  <AutoSuggest
                    query={value}
                    onSuggestionsFetchRequested={
                      this.handleSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                      this.handleSuggestionsClearRequested
                    }
                    onSuggestionSelected={this.handleSuggestionSelected}
                    onChange={this.handleChange}
                  />
                )}
              </Box>
              <IconButton onClick={this.handleClose}>
                <Close />
              </IconButton>
            </Grid>
          </ClickAwayListener>
        </Slide>
      </Fragment>
    );
  }
}

export default compose(withStyles(styles), withRouter)(Search);
