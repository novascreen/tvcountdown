import * as React from 'react';
import { graphql, QueryProps, compose } from 'react-apollo';
import IconButton from 'material-ui/IconButton/IconButton';
import Star from 'material-ui-icons/Star';
import StarBorder from 'material-ui-icons/StarBorder';

import { GET_FAVORITES, TOGGLE_FAVORITE, Favorites } from 'resolvers/favorites';

type InputProps = {
  showId: number;
};

type Mutation = {
  onToggle?: (showId: number) => void;
};

type Response = {
  favorites?: Favorites;
};

export const FavoriteToggle: React.SFC<InputProps & Response & Mutation> = ({
  showId,
  favorites = [],
  onToggle = () => null,
}) => {
  const isFavorite = favorites.includes(showId);
  const onClick = (e: any) => {
    e.stopPropagation();
    onToggle(showId);
  };
  return (
    <IconButton onClick={onClick} color="secondary">
      {isFavorite ? <Star /> : <StarBorder />}
    </IconButton>
  );
};

export default compose(
  graphql<QueryProps, InputProps, Response>(TOGGLE_FAVORITE, {
    props: ({ mutate }) => ({
      onToggle: (showId: number) =>
        mutate ? mutate({ variables: { showId } }) : undefined,
    }),
  }),
  graphql<QueryProps, InputProps, Response>(GET_FAVORITES, {
    props: ({ data }) => ({ ...data }),
  }),
)(FavoriteToggle);
