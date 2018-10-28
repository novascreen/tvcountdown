import * as React from 'react';
import * as R from 'ramda';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Composer from 'react-composer';
import { TOGGLE_FAVORITE } from 'resolvers/favorites';
import { FavoriteShow } from 'graphql/types';
import fragments from 'graphql/fragments';

const CREATE_FAVORITE_SHOW = gql`
  mutation CreateFavoriteShow($tvmaze: Int!) {
    createFavoriteShow(tvmaze: $tvmaze) {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

type CFS = {
  mutate: any;
  userId: string;
  showId: number;
  favoriteShows: FavoriteShow[];
};
const createFavoriteShow = ({ mutate, userId, showId, favoriteShows }: CFS) =>
  mutate({
    variables: { tvmaze: showId },
    optimisticResponse: {
      __typename: 'Mutation',
      createFavoriteShow: {
        __typename: 'User',
        id: userId,
        favoriteShows: [
          ...favoriteShows,
          { __typename: 'FavoriteShow', id: -1, tvmaze: showId },
        ],
      },
    },
  });

const DELETE_FAVORITE_SHOW = gql`
  mutation DeleteFavoriteShow($id: ID!) {
    deleteFavoriteShow(id: $id) {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

type DFS = {
  mutate: any;
  userId: string;
  favoriteShow: FavoriteShow;
  favoriteShows: FavoriteShow[];
};
const deleteFavoriteShow = ({
  mutate,
  userId,
  favoriteShow,
  favoriteShows,
}: DFS) => {
  const favoriteShowIndex = R.findIndex(
    R.propEq('id', favoriteShow.id),
    favoriteShows,
  );
  return mutate({
    variables: { id: favoriteShow.id },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteFavoriteShow: {
        __typename: 'User',
        id: userId,
        favoriteShows: R.remove(favoriteShowIndex, 1, favoriteShows),
      },
    },
  });
};

type RenderProps = {
  loading: boolean;
  onToggle: (e: React.MouseEvent<HTMLElement>) => void;
};

type Props = {
  userId?: string;
  showId?: number;
  favoriteShow?: FavoriteShow;
  favoriteShows?: FavoriteShow[];
  children: (props: RenderProps) => React.ReactNode;
};

const ToggleMutation: React.SFC<Props> = ({
  userId,
  showId,
  favoriteShow,
  favoriteShows,
  children,
}) => (
  <Composer
    components={[
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
      [toggleFavorite, toggleResult],
      [createFavorite, createResult],
      [deleteFavorite, deleteResult],
    ]: any[]) => {
      const loading =
        toggleResult.loading || createResult.loading || deleteResult.loading;
      return children({
        loading,
        onToggle: e => {
          e.stopPropagation();

          if (loading || !favoriteShows || !showId) return;

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
