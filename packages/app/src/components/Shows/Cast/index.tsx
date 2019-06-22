import React from 'react';
import {
  Show,
  CastMembersQuery,
  CastMembersQueryVariables,
} from 'graphql/types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from 'components/UI/Loading';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import * as R from 'ramda';
import Box from 'components/UI/Box';

type Props = {
  showId: number;
};

const CAST_MEMBERS = gql`
  query CastMembers($showId: Int!) {
    cast(showId: $showId) {
      person {
        name
        image {
          medium
        }
      }
      character {
        id
        name
        image {
          medium
        }
      }
    }
  }
`;

const useStyles = makeStyles({
  imageWrapper: {
    float: 'left',
  },
  img: {
    width: 100,
    height: 'auto',
  },
});

function getPath<T>(path: string[], obj: any, d: T): T {
  return R.path(path, obj) || d;
}

export default function Cast({ showId }: Props) {
  const classes = useStyles();
  const { data, loading } = useQuery<
    CastMembersQuery,
    CastMembersQueryVariables
  >(CAST_MEMBERS, { variables: { showId } });
  console.log({ loading, data });
  if (loading) return <Loading />;
  if (!data || !data.cast || !data.cast.length)
    return <>No cast members found</>;
  return (
    <Grid container>
      {data.cast.map((castMember, idx) => {
        const characterId = getPath<number>(
          ['character', 'id'],
          castMember,
          idx,
        );
        const personName = getPath<string>(['person', 'name'], castMember, '');
        const characterName = getPath<string>(
          ['character', 'name'],
          castMember,
          '',
        );
        const personImage = getPath<string>(
          ['person', 'image', 'medium'],
          castMember,
          '',
        );
        const characterImage = getPath<string>(
          ['character', 'image', 'medium'],
          castMember,
          '',
        );
        const image: string = characterImage || personImage || '';
        return (
          <Grid key={characterId} item xs={12} sm={6}>
            <Box mr={2} className={classes.imageWrapper}>
              {image && (
                <img className={classes.img} src={image} alt={characterName} />
              )}
            </Box>
            <Typography>{characterName}</Typography>
            <Typography> as {personName}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}
