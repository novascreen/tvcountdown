import React from 'react';
import { oc } from 'ts-optchain';
import { CastMembersQuery, CastMembersQueryVariables } from 'graphql/types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from 'components/UI/Loading';
import { Grid, Typography, makeStyles } from '@material-ui/core';
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

const useCastMembers = (showId: number) =>
  useQuery<CastMembersQuery, CastMembersQueryVariables>(CAST_MEMBERS, {
    variables: { showId },
  });

export default function Cast({ showId }: Props) {
  const classes = useStyles();
  const { data, loading } = useCastMembers(showId);

  if (loading) return <Loading />;
  if (!oc(data).cast.length(0)) return <>No cast members found</>;

  return (
    <Grid container>
      {oc(data)
        .cast([])
        .map((castMember, idx) => {
          const character = oc(castMember).character();
          const person = oc(castMember).person();
          const image: string =
            oc(character).image.medium() || oc(person).image.medium('');
          return (
            <Grid key={oc(character).id(idx)} item xs={12} sm={6}>
              <Box mr={2} className={classes.imageWrapper}>
                {image && (
                  <img
                    className={classes.img}
                    src={image}
                    alt={oc(character).name('')}
                  />
                )}
              </Box>
              <Typography variant="body2">{oc(person).name()}</Typography>
              <Typography> as {oc(character).name()}</Typography>
            </Grid>
          );
        })}
    </Grid>
  );
}
