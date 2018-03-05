import * as R from 'ramda';
import { graphql, QueryProps, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_FAVORITES, TOGGLE_FAVORITE } from 'resolvers/favorites';
import fragments from 'api/fragments';
import withMyFavoriteShows from 'api/withMyFavoriteShows';
import withMutationState from 'components/Util/withMutationState';

const CREATE_FAVORITE_SHOW = gql`
  mutation CreateFavoriteShow($tvmaze: Int!) {
    createFavoriteShow(tvmaze: $tvmaze) {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

const withCreateFavoriteShow = graphql<QueryProps, any>(CREATE_FAVORITE_SHOW, {
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
});

const DELETE_FAVORITE_SHOW = gql`
  mutation DeleteFavoriteShow($id: ID!) {
    deleteFavoriteShow(id: $id) {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

const withDeleteFavoriteShow = graphql<QueryProps, any>(DELETE_FAVORITE_SHOW, {
  props: ({ ownProps, mutate }) => ({
    deleteFavoriteShow: (id: string) => {
      const me = ownProps.me;
      if (!me || !mutate) return null;
      const myId = me.id;
      const favoriteShows = me.favoriteShows || [];
      const favoriteShowIndex = R.findIndex(R.propEq('id', id), favoriteShows);
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
});

type TFInputProps = {
  showId: number;
};

const withToggleFavorite = graphql<QueryProps, TFInputProps>(TOGGLE_FAVORITE, {
  props: ({ mutate }) => ({
    onToggle: (showId: number) =>
      mutate ? mutate({ variables: { showId } }) : undefined,
  }),
});

export default compose(
  withMyFavoriteShows,
  withCreateFavoriteShow,
  withMutationState({ name: 'createFavoriteShow' }),
  withDeleteFavoriteShow,
  withMutationState({ name: 'deleteFavoriteShow' }),
  withToggleFavorite,
  graphql<QueryProps, any>(GET_FAVORITES, {
    props: ({ data }) => ({ ...data }),
  }),
);
