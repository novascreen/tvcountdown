import * as React from 'react';
import { Favorites as FavoritesType } from 'resolvers/favorites';
import Loading from 'components/UI/Loading';
import List from 'components/Shows/List';
import withData from './withData';
import { Show } from 'api/models';

type Props = {
  favorites?: FavoritesType;
  loadingMyFavoriteShows: boolean;
  shows: [Show];
};

export const Favorites = ({ shows }: Props) => {
  if (!shows) return <Loading />;
  return <List shows={shows} />;
};

export default withData(Favorites);
