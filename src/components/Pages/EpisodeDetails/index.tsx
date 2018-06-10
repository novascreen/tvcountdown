import * as React from 'react';
import { graphql, ChildDataProps } from 'react-apollo';
import gql from 'graphql-tag';
// import { RouteComponentProps } from 'react-router';

import { Episode as EpisodeType } from 'graphql/types';
import { Loading } from 'components/UI/Loading';
import EpisodeDetails from 'components/Episodes/Details';

// type RouterParams = {
//   showId: string;
//   episodeId: string;
// };

// type InputProps = {} & RouteComponentProps<RouterParams>;
type InputProps = any;

type Response = {
  episode?: EpisodeType;
};

type MyQueryProps = {
  error?: Error;
  loading?: boolean;
};

export const EpisodeDetailsPage: React.SFC<
  MyQueryProps & InputProps & Response
> = props => {
  const { loading, episode } = props;
  if (loading) return <Loading />;
  if (!episode) return <>Episode not found</>;
  return <EpisodeDetails episode={episode} />;
};

const GET_EPISODE = gql`
  query GetEpisode($episodeId: Int!) {
    episode(id: $episodeId) {
      id
      name
      summary
      season
      number
      airstamp
      runtime
      image {
        medium
      }
      show {
        id
        name
        airedYears
        genres
      }
    }
  }
`;

type Variables = any;
type ChildProps = ChildDataProps<InputProps, Response, Variables>;

export default graphql<InputProps, Response, Variables, ChildProps>(
  GET_EPISODE,
  {
    options: ({
      match: {
        params: { episodeId },
      },
    }) => ({
      variables: { episodeId: parseInt(episodeId, 10) },
    }),
    props: ({ data }) => ({ ...data }),
  },
)(EpisodeDetailsPage);
