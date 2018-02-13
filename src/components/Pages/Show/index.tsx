import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';

import { Episode } from 'models/graphql';

type InputProps = {
  id: string;
};

type Response = {
  scheduleByDate?: Episode[];
};

type MyQueryProps = {
  error?: Error,
  loading?: boolean,
};

export const Show: React.SFC<MyQueryProps & InputProps & Response> = (props) => {
  console.log(props);
  return <div>Hello Show</div>;
};

const GET_SHOW = gql`
  query GetShow($show: String!) {
    show(id: $id) {
      id
      name
      season
      number
      airstamp
      show {
        id
        name
      }
    }
  }
`;

export default graphql<QueryProps, InputProps, Response>(GET_SHOW, {
  options: ({ id }) => ({
    variables: { id }
  }),
  props: ({ data }) => ({ ...data })
})(Show);
