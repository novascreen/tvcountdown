import * as React from 'react';
import * as R from 'ramda';
import { graphql, QueryProps, compose } from 'react-apollo';
import gql from 'graphql-tag';
import IconButton from 'material-ui/IconButton/IconButton';
import Star from 'material-ui-icons/Star';
import StarBorder from 'material-ui-icons/StarBorder';

import { GET_FAVORITES, TOGGLE_FAVORITE, Favorites } from 'resolvers/favorites';
import { User, FavoriteShow } from 'models/graphql';
import { isAuthenticated } from 'lib/Auth';
import withMutationState from '../../Util/withMutationState';

type InputProps = {
  showId: number;
  me?: User;
};

type Mutation = {
  onToggle?: (showId: number) => void;
  createFavoriteShow?: (tvmaze: number) => void;
  deleteFavoriteShow?: (id: string) => void;
};

type Response = {
  favorites?: Favorites;
  me?: User;
  loadingMyFavoriteShows?: boolean;
  createFavoriteShowLoading?: boolean;
  deleteFavoriteShowLoading?: boolean;
};

export const FavoriteToggle: React.SFC<InputProps & Response & Mutation> = ({
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
      color="secondary"
      disabled={loadingMyFavoriteShows}
    >
      {isFavorite ? <Star /> : <StarBorder />}
    </IconButton>
  );
};

const fragments = {
  myFavoriteShows: gql`
    fragment MyFavoriteShows on User {
      id
      favoriteShows {
        id
        tvmaze
      }
    }
  `,
};

const GET_MY_FAVORITE_SHOWS = gql`
  query GetMyFavoriteShows {
    me {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

const withMyFavoriteShows = graphql<QueryProps, InputProps, Response>(
  GET_MY_FAVORITE_SHOWS,
  {
    skip: () => !isAuthenticated(),
    props: ({ data }) => ({
      ...data,
      loadingMyFavoriteShows: data && data.loading,
    }),
  },
);

const CREATE_FAVORITE_SHOW = gql`
  mutation CreateFavoriteShow($tvmaze: Int!) {
    createFavoriteShow(tvmaze: $tvmaze) {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

const withCreateFavoriteShow = graphql<QueryProps, InputProps, Response>(
  CREATE_FAVORITE_SHOW,
  {
    props: ({ ownProps, mutate }) => ({
      createFavoriteShow: (tvmaze: number) => {
        const me = ownProps.me;
        if (!me || !mutate) return null;
        const id = me.id;
        const favoriteShows = me.favoriteShows || [];
        return mutate({
          variables: { tvmaze },
          optimisticResponse: {
            __typename: 'Mutation',
            createFavoriteShow: {
              __typename: 'User',
              id,
              favoriteShows: [
                ...favoriteShows,
                { __typename: 'FavoriteShow', id: -1, tvmaze },
              ],
            },
          },
        });
      },
    }),
  },
);

const DELETE_FAVORITE_SHOW = gql`
  mutation DeleteFavoriteShow($id: ID!) {
    deleteFavoriteShow(id: $id) {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

const withDeleteFavoriteShow = graphql<QueryProps, InputProps, Response>(
  DELETE_FAVORITE_SHOW,
  {
    props: ({ ownProps, mutate }) => ({
      deleteFavoriteShow: (id: string) => {
        const me = ownProps.me;
        if (!me || !mutate) return null;
        const myId = me.id;
        const favoriteShows = me.favoriteShows || [];
        const favoriteShowIndex = R.findIndex(
          R.propEq('id', id),
          favoriteShows,
        );
        return mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteFavoriteShow: {
              __typename: 'User',
              id: myId,
              favoriteShows: R.remove(favoriteShowIndex, 1, favoriteShows),
            },
          },
        });
      },
    }),
  },
);

export default compose(
  withMyFavoriteShows,
  withCreateFavoriteShow,
  withMutationState({ name: 'createFavoriteShow' }),
  withDeleteFavoriteShow,
  withMutationState({ name: 'deleteFavoriteShow' }),
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
