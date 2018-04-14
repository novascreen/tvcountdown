import * as React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
// import { MenuItem } from 'material-ui/Menu';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
// import Grid from 'material-ui/Grid';
import { RenderSuggestion, OnSuggestionSelected } from 'react-autosuggest';

import { Show } from 'api/models';
import UIAutoSuggest from 'components/UI/AutoSuggest';
import FavoriteToggle from 'components/Shows/FavoriteToggle';
import { theme } from 'withRoot';

const getSuggestionValue = (suggestion: Show) => suggestion.name;

const avatarStyles = {
  width: 60,
  height: 60,
};

const renderSuggestion: RenderSuggestion<Show> = (
  suggestion,
  { isHighlighted },
) => {
  const year = suggestion.premiered ? suggestion.premiered.split('-')[0] : '';
  const networkName = suggestion.network && suggestion.network.name;
  let secondaryText = year ? [year] : [];
  secondaryText = secondaryText.concat(networkName ? [networkName] : []);
  return (
    <ListItem
      button
      style={{
        background: isHighlighted ? theme.palette.divider : 'transparent',
      }}
      component="div"
    >
      {suggestion.image && suggestion.image.medium ? (
        <Avatar style={avatarStyles} src={suggestion.image.medium} />
      ) : (
        <Avatar style={avatarStyles}>{suggestion.name.slice(0, 1)}</Avatar>
      )}
      <ListItemText
        primary={suggestion.name}
        secondary={secondaryText.join(', ')}
      />
      <ListItemSecondaryAction>
        <FavoriteToggle showId={suggestion.id} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

type InputProps = {
  query: string;
  onSuggestionsFetchRequested: () => void;
  onSuggestionsClearRequested: () => void;
  onSuggestionSelected: OnSuggestionSelected<Show>;
  onChange: (e: any) => void;
};

type Response = {
  search?: Show[];
};

type MyQueryProps = {
  error?: Error;
  loading?: boolean;
};

export const AutoSuggest: React.SFC<MyQueryProps & InputProps & Response> = ({
  search = [],
  query = '',
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  onSuggestionSelected,
  onChange,
  ...props
}) => (
  <UIAutoSuggest
    suggestions={search.slice(0, 5)}
    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
    onSuggestionsClearRequested={onSuggestionsClearRequested}
    onSuggestionSelected={onSuggestionSelected}
    getSuggestionValue={getSuggestionValue}
    renderSuggestion={renderSuggestion}
    inputProps={{
      value: query,
      onChange,
      autoFocus: true,
    }}
  />
);

const SEARCH = gql`
  query Search($query: String!) {
    search(query: $query) {
      id
      name
      premiered
      image {
        medium
      }
      network {
        name
      }
    }
  }
`;

export default graphql<InputProps, Response, any>(SEARCH, {
  options: ({ query }) => ({
    variables: { query },
  }),
  props: ({ data }) => ({ ...data }),
})(AutoSuggest);
