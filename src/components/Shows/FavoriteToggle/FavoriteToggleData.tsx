import * as React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Composer from 'react-composer';
import { TOGGLE_FAVORITE } from 'resolvers/favorites';
import fragments from 'graphql/fragments';
import FavoritesQuery, { Result as FQResult } from 'graphql/FavoritesQuery';
import createFavoriteShow from 'graphql/createFavoriteShow';
import deleteFavoriteShow from 'graphql/deleteFavoriteShow';

const CREATE_FAVORITE_SHOW = gql`
  mutation CreateFavoriteShow($tvmaze: Int!) {
    createFavoriteShow(tvmaze: $tvmaze) {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

const DELETE_FAVORITE_SHOW = gql`
  mutation DeleteFavoriteShow($id: ID!) {
    deleteFavoriteShow(id: $id) {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

type RenderProps = {
  loading: boolean;
  onToggle: () => void;
};

type Props = {
  showId?: number;
  children: (props: RenderProps) => React.ReactNode;
};

const ToggleMutation: React.SFC<Props> = ({ showId, children }) => (
  <Composer
    components={[
      <FavoritesQuery key="favoritesQuery" children={() => null} />,
      ({ render }: any) => (
        <Mutation
          key="toggleLocal"
          mutation={TOGGLE_FAVORITE}
          children={(toggle, result) => render([toggle, result])}
        />
      ),
      ({ render }: any) => (
        <Mutation
          key="create"
          mutation={CREATE_FAVORITE_SHOW}
          children={(toggle, result) => render([toggle, result])}
        />
      ),
      ({ render }: any) => (
        <Mutation
          key="delete"
          mutation={DELETE_FAVORITE_SHOW}
          children={(toggle, result) => render([toggle, result])}
        />
      ),
    ]}
  >
    {([
      { userId, favoriteShows },
      [toggleFavorite, toggleResult],
      [createFavorite, createResult],
      [deleteFavorite, deleteResult],
    ]: [FQResult, any, any, any]) => {
      const loading =
        toggleResult.loading || createResult.loading || deleteResult.loading;

      return children({
        loading,
        onToggle: () => {
          if (loading || !favoriteShows || !showId) return;

          const favoriteShow = favoriteShows.find(
            show => show.tvmaze === showId,
          );

          if (userId) {
            if (favoriteShow) {
              deleteFavoriteShow({
                mutate: deleteFavorite,
                userId,
                favoriteShow,
                favoriteShows,
              });
              return;
            }
            createFavoriteShow({
              mutate: createFavorite,
              userId,
              showId,
              favoriteShows,
            });
            return;
          }

          toggleFavorite({ variables: { showId } });
        },
      });
    }}
  </Composer>
);

export default ToggleMutation;
