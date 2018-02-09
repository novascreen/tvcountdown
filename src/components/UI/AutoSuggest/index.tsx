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
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    maxWidth: 400,
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
      inputRef={inputProps.ref}
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
    inputProps={{
      placeholder: 'Search',
      ...inputProps,
    }}
    {...props}
  />
);

export default (
  withStyles(styles)
)<Props>(AutoSuggest);
