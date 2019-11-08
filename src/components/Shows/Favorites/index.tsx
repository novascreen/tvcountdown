import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Typography from '@material-ui/core/Typography';
import { oc } from 'ts-optchain';
import Loading from 'components/UI/Loading';
import List from 'components/Shows/List';
import { Show, QueryShowsArgs } from 'graphql/types';
import { useFavoritesQuery } from 'graphql/FavoritesQuery';

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

const useGetShows = (ids: QueryShowsArgs['ids']) => {
  return useQuery<{ shows: Show[] }, QueryShowsArgs>(GET_SHOWS, {
    variables: {
      ids: ids
    },
    skip: !ids
  });
};

export const Favorites = () => {
  const favoritesResult = useFavoritesQuery();
  const showsResult = useGetShows(favoritesResult.favoriteShowsIds);
  const shows = oc(showsResult).data.shows([]);

  if (favoritesResult.loading || showsResult.loading) {
    return <Loading />;
  }
  if (!shows.length) {
    return <Typography>You haven't saved any shows yet</Typography>;
  }
  return <List shows={shows} />;
};

export default Favorites;
