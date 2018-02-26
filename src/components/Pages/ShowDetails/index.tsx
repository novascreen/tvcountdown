import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';

import { Show as ShowType } from 'models/graphql';
import { Loading } from 'components/UI/Loading';
import ShowDetails from 'components/Shows/Details';

type RouterParams = {
  showId: string;
};

type InputProps = {};

type Response = {
  show?: ShowType;
};

type MyQueryProps = {
  error?: Error;
  loading?: boolean;
};

export const ShowDetailsPage: React.SFC<
  MyQueryProps & InputProps & Response
> = props => {
  const { loading, show } = props;
  if (loading) return <Loading />;
  if (!show) return <>Show not found</>;

  return <ShowDetails show={show} />;
};

const GET_SHOW = gql`
  query GetShow($showId: Int!) {
    show(id: $showId) {
      id
      name
      airedYears
      summary
      runtime
      genres
      status
      officialSite
      image {
        medium
      }
      network {
        name
      }
      webChannel {
        name
      }
      schedule {
        time
        days
      }
      previousEpisode {
        id
        name
        airstamp
        season
        number
        summary
      }
      nextEpisode {
        id
        name
        airstamp
        season
        number
        summary
      }
    }
  }
`;

export default graphql<
  QueryProps,
  InputProps,
  Response,
  RouteComponentProps<RouterParams>
>(GET_SHOW, {
  options: ({ match: { params: { showId } } }) => ({
    variables: { showId: parseInt(showId, 10) },
  }),
  props: ({ data }) => ({ ...data }),
})(ShowDetailsPage);
