import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

type InputProps = {
  query: string;
};

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

export default compose(
  graphql<InputProps, Response, any>(SEARCH, {
    options: ({ query }) => ({
      variables: { query },
    }),
    props: ({ data }) => ({ ...data }),
  }),
);
