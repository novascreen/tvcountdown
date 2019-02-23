import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Typography } from '@material-ui/core';
import Loading from 'components/UI/Loading';
import List from 'components/Shows/List';
import { Show } from 'graphql/types';

interface Data {
  search: [Show];
}

interface Variables {
  query?: string;
}

class SearchQuery extends Query<Data, Variables> {}

const SEARCH = gql`
  query Search($query: String!) {
    search(query: $query) {
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

type Props = {} & Variables;

export const SearchResults = ({ query }: Props) => {
  return (
    <>
      <Typography variant="title" gutterBottom>
        Search results for: {query}
      </Typography>
      <SearchQuery query={SEARCH} variables={{ query }}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (!data || !data.search || !data.search.length) {
            return <Typography>No shows found</Typography>;
          }
          return <List shows={data.search} />;
        }}
      </SearchQuery>
    </>
  );
};

export default SearchResults;
