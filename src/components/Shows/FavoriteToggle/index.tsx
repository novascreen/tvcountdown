import * as React from 'react';
import IconButton from 'material-ui/IconButton/IconButton';
import Star from 'material-ui-icons/Star';
import StarBorder from 'material-ui-icons/StarBorder';

import { User, FavoriteShow } from 'api/models';
import withData from './withData';
import { Favorites } from 'resolvers/favorites';

type Props = {
  favorites?: Favorites;
  showId: number;
  me?: User;
  loadingMyFavoriteShows?: boolean;
  createFavoriteShowLoading?: boolean;
  deleteFavoriteShowLoading?: boolean;
  onToggle?: (showId: number) => void;
  createFavoriteShow?: (tvmaze: number) => void;
  deleteFavoriteShow?: (id: string) => void;
};

export const FavoriteToggle: React.SFC<Props> = ({
  showId,
  favorites = [],
  loadingMyFavoriteShows,
  createFavoriteShowLoading,
  deleteFavoriteShowLoading,
  me,
  onToggle = () => null,
  createFavoriteShow = () => null,
  deleteFavoriteShow = () => null,
  ...props
}) => {
  const saving = createFavoriteShowLoading || deleteFavoriteShowLoading;
  const favoriteShows = (me && me.favoriteShows) || [];
  const favoriteShow: FavoriteShow | undefined = favoriteShows.find(
    show => show.tvmaze === showId,
  );
  const isFavorite =
    loadingMyFavoriteShows || me
      ? Boolean(favoriteShow)
      : favorites.includes(showId);

  const onClick = (e: any) => {
    e.stopPropagation();

    // Ignore clicks while saving
    if (saving) return;

    if (me) {
      if (isFavorite && favoriteShow && favoriteShow.id) {
        deleteFavoriteShow(favoriteShow.id);
      } else if (!isFavorite) {
        createFavoriteShow(showId);
      }
    } else {
      onToggle(showId);
    }
  };
  return (
    <IconButton
      onClick={onClick}
      color="primary"
      disabled={loadingMyFavoriteShows}
    >
      {isFavorite ? <Star /> : <StarBorder />}
    </IconButton>
  );
};

export default withData(FavoriteToggle);
