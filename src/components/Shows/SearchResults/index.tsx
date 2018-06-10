import * as React from 'react';
import { Typography } from '@material-ui/core';
import Loading from 'components/UI/Loading';
import List from 'components/Shows/List';
import { Show } from 'graphql/types';
import withData from './withData';

type Props = {
  query?: string;
  loading?: boolean;
  search: [Show];
};

export const SearchResults = ({ loading, query, search, ...props }: Props) => {
  console.log(props);
  return (
    <>
      <Typography variant="title" gutterBottom>
        Search results for: {query}
      </Typography>
      {loading && <Loading />}
      {search ? (
        <List shows={search} />
      ) : (
        <Typography>No shows found</Typography>
      )}
    </>
  );
};

export default withData(SearchResults);
