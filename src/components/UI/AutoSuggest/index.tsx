import * as React from 'react';
import * as ReactAutosuggest from 'react-autosuggest';
import { AutosuggestProps } from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { withStyles, WithStyles } from 'material-ui/styles';
import { StyleRules } from 'material-ui/styles/withStyles';
import { Theme } from 'material-ui/styles/createMuiTheme';

type Styles =
  | 'container'
  | 'suggestionsContainerOpen'
  | 'suggestion'
  | 'suggestionsList';

const styles = (theme: Theme): StyleRules<Styles> => ({
  container: {
    flexGrow: 1,
    // position: 'relative',
    // height: 200,
    // width: 200,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

function renderInput(inputProps: ReactAutosuggest.InputProps<any>): JSX.Element {
  return (
    <TextField
      fullWidth
      inputProps={inputProps}
    />
  );
}

function renderSuggestionsContainer(
  options: ReactAutosuggest.RenderSuggestionsContainerParams
) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

type Props = AutosuggestProps<any>;

const AutoSuggest: React.SFC<Props & WithStyles<Styles>> = ({
  classes,
  inputProps,
  ...props,
}) => (
  <ReactAutosuggest
    theme={{
      container: classes.container,
      suggestionsContainerOpen: classes.suggestionsContainerOpen,
      suggestionsList: classes.suggestionsList,
      suggestion: classes.suggestion,
    }}
    renderSuggestionsContainer={renderSuggestionsContainer}
    renderInputComponent={renderInput}
    // suggestions={suggestions}
    // onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
    // onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
    // getSuggestionValue={getSuggestionValue}
    // renderSuggestion={renderSuggestion}
    inputProps={{
      placeholder: 'Search',
      // value: this.state.value,
      // onChange: this.handleChange,
      ...inputProps,
    }}
    {...props}
  />
);

export default (
  withStyles(styles)
)<Props>(AutoSuggest);
