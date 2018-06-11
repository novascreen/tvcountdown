import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import Loading from 'components/UI/Loading';
import List from 'components/Shows/List';
import { Show } from 'graphql/types';
import FavoritesQuery from 'graphql/FavoritesQuery';

interface Data {
  shows: Show[];
}

interface Variables {
  ids: number[];
}

class ShowsQuery extends Query<Data, Variables> {}

const GET_SHOWS = gql`
  query GetShows($ids: [Int]!) {
    shows(ids: $ids) {
      id
      name
      premiered
      image {
        medium
      }
      network {
        name
      }
    }
  }
`;

export const Favorites = () => {
  return (
    <>
      <Typography variant="title" gutterBottom>
        Favorites
      </Typography>
      <FavoritesQuery>
        {favoritesResult => (
          <ShowsQuery
            query={GET_SHOWS}
            variables={{
              ids: favoritesResult.favoriteShowsIds,
            }}
          >
            {showsResult => {
              if (favoritesResult.loading || showsResult.loading) {
                return <Loading />;
              }
              if (
                !showsResult.data ||
                !showsResult.data.shows ||
                !showsResult.data.shows.length
              ) {
                return <Typography>No shows added to favorites yet</Typography>;
              }
              return <List shows={showsResult.data.shows} />;
            }}
          </ShowsQuery>
        )}
      </FavoritesQuery>
    </>
  );
};

export default Favorites;
