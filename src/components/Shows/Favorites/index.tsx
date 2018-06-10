import * as React from 'react';
import { Typography } from 'material-ui';
import { Favorites as FavoritesType } from 'resolvers/favorites';
import Loading from 'components/UI/Loading';
import List from 'components/Shows/List';
import { Show } from 'graphql/types';
import withData from './withData';

type Props = {
  favorites?: FavoritesType;
  loadingMyFavoriteShows: boolean;
  shows: [Show];
};

export const Favorites = ({ shows }: Props) => {
  if (!shows) return <Loading />;
  return (
    <>
      <Typography variant="title" gutterBottom>
        Favorites
      </Typography>
      {shows.length > 0 ? (
        <List shows={shows} />
      ) : (
        <Typography>No shows added to favorites yet</Typography>
      )}
    </>
  );
};

export default withData(Favorites);
