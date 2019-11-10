import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import * as R from 'ramda';
import { CastMembersQuery, CastMembersQueryVariables } from 'graphql/types';
import Loading from 'components/UI/Loading';
import Box from 'components/UI/Box';
import { oc } from 'ts-optchain';

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

export default function Cast({ showId }: Props) {
  const classes = useStyles();
  const { data, loading } = useQuery<
    CastMembersQuery,
    CastMembersQueryVariables
  >(CAST_MEMBERS, { variables: { showId } });
  if (loading) return <Loading />;
  if (!data || !data.cast || !data.cast.length)
    return <>No cast members found</>;
  return (
    <Grid container>
      {data.cast.map((castMember, idx) => {
        const characterId = oc(castMember).character.id(idx);
        const personName = oc(castMember).person.name();
        const personImage = oc(castMember).person.image.medium();
        const characterName = oc(castMember).character.name('');
        const characterImage = oc(castMember).character.image.medium();
        const image: string = characterImage || personImage || '';
        return (
          <Grid key={characterId} item xs={12} sm={6}>
            <Box mr={2} className={classes.imageWrapper}>
              {image && (
                <img className={classes.img} src={image} alt={characterName} />
              )}
            </Box>
            <Typography>{personName}</Typography>
            <Typography>as {characterName}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}
