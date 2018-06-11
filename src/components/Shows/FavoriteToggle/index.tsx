import * as React from 'react';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

import { User } from 'graphql/types';
import { Favorites } from 'resolvers/favorites';
import ToggleMutation from './ToggleMutation';
import FavoritesQuery from 'graphql/FavoritesQuery';

type Props = {
  favorites?: Favorites;
  showId: number;
  me?: User;
  auth?: boolean;
  loadingMyFavoriteShows?: boolean;
  createFavoriteShowLoading?: boolean;
  deleteFavoriteShowLoading?: boolean;
  onToggle?: (showId: number) => void;
  createFavoriteShow?: (tvmaze: number) => void;
  deleteFavoriteShow?: (id: string) => void;
};

export const FavoriteToggle: React.SFC<Props> = ({
  showId,
  // favorites = [],
  // loadingMyFavoriteShows,
  // createFavoriteShowLoading,
  // deleteFavoriteShowLoading,
  // me,
  // // onToggle = () => null,
  // createFavoriteShow = () => null,
  // deleteFavoriteShow = () => null,
}) => {
  // const saving = createFavoriteShowLoading || deleteFavoriteShowLoading;
  // const favoriteShows = (me && me.favoriteShows) || [];
  // const favoriteShow: FavoriteShow | undefined = favoriteShows.find(
  //   show => show.tvmaze === showId,
  // );
  // const isFavorite =
  //   loadingMyFavoriteShows || me
  //     ? Boolean(favoriteShow)
  //     : favorites.includes(showId);

  // const onClick = (e: any) => {
  //   e.stopPropagation();

  //   // Ignore clicks while saving
  //   if (saving) return;

  //   if (me) {
  //     if (isFavorite && favoriteShow && favoriteShow.id) {
  //       deleteFavoriteShow(favoriteShow.id);
  //     } else if (!isFavorite) {
  //       createFavoriteShow(showId);
  //     }
  //   } else {
  //     onToggle(showId);
  //   }
  // };

  return (
    <FavoritesQuery>
      {({ userId, favoriteShows, favoriteShowsIds }) => {
        const favoriteShow = favoriteShows.find(show => show.tvmaze === showId);
        return (
          <ToggleMutation
            userId={userId}
            showId={showId}
            favoriteShow={favoriteShow}
            favoriteShows={favoriteShows}
          >
            {({ onToggle, loading }) => {
              return (
                <IconButton
                  onClick={onToggle}
                  color="primary"
                  disabled={loading}
                >
                  {favoriteShow ? <Star /> : <StarBorder />}
                </IconButton>
              );
            }}
          </ToggleMutation>
        );
      }}
    </FavoritesQuery>
  );
};

export default FavoriteToggle;
