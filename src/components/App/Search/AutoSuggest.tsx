
import * as React from 'react';
import gql from 'graphql-tag';
import { graphql, QueryProps } from 'react-apollo';
import { MenuItem } from 'material-ui/Menu';
import { RenderSuggestion, OnSuggestionSelected } from 'react-autosuggest';

import UIAutoSuggest from 'components/UI/AutoSuggest';
import { Show } from 'models/graphql';
import FavoriteToggle from 'components/FavoriteToggle';
import Avatar from 'material-ui/Avatar';

const getSuggestionValue = (suggestion: Show) => suggestion.name;

const renderSuggestion: RenderSuggestion<Show> = (suggestion, { isHighlighted }) => (
  <MenuItem selected={isHighlighted} component="div">
    {suggestion.image && suggestion.image.medium ?
      <Avatar src={suggestion.image.medium} />
      :
      <Avatar>{suggestion.name.slice(0, 1)}</Avatar>
    }
    {suggestion.name}
    <FavoriteToggle showId={suggestion.id} />
  </MenuItem>
);

type InputProps = {
  query: string;
  onSuggestionsFetchRequested: () => void,
  onSuggestionsClearRequested: () => void,
  onSuggestionSelected: OnSuggestionSelected<Show>,
  onChange: (e: any) => void,
};

type Response = {
  search?: Show[];
};

type MyQueryProps = {
  error?: Error,
  loading?: boolean,
};

export const AutoSuggest: React.SFC<MyQueryProps & InputProps & Response> = ({
  search = [],
  query = '',
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  onSuggestionSelected,
  onChange,
  ...props,
}) => (
  <UIAutoSuggest
    suggestions={search}
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
      image {
        medium
      }
    }
  }
`;

export default graphql<QueryProps, InputProps, Response>(SEARCH, {
  options: ({ query }) => ({
    variables: { query }
  }),
  props: ({ data }) => ({ ...data })
})(AutoSuggest);