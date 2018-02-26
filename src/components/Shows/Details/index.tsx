import * as React from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import { Show as ShowType } from 'models/graphql';
import Box from 'components/UI/Box';
import FavoriteToggle from 'components/Shows/FavoriteToggle';
import HTML from 'components/Util/HTML';
import EpisodeCard from 'components/Episodes/EpisodeCard';
import Info from 'components/Shows/Info';
import InlineDivider from 'components/UI/InlineDivider';

type Props = {
  show: ShowType;
};

export const ShowDetails = ({ show }: Props) => {
  const episodes = [];
  if (show.nextEpisode) {
    episodes.push({
      episode: show.nextEpisode,
      title: 'Next Episode',
    });
  }
  if (show.previousEpisode) {
    episodes.push({
      episode: show.previousEpisode,
      title: 'Previous Episode',
    });
  }

  return (
    <>
      <Box mB={3} mT={3}>
        <Typography variant="display1">
          {show.name} <FavoriteToggle showId={show.id} />
        </Typography>
        <Box mB={1}>
          <Typography variant="caption">
            {show.airedYears} | {show.runtime} min<InlineDivider />
            {show.genres && show.genres.join(', ')}
          </Typography>
        </Box>
        <Divider />
      </Box>
      <Box mB={4}>
        <Typography>
          {show.image && (
            <Box pR={2} style={{ float: 'left', maxWidth: '40%' }}>
              <img
                src={show.image.medium}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Box>
          )}
          <HTML content={show.summary} />
        </Typography>
      </Box>
      {episodes.length && (
        <Box mB={4}>
          <Grid container>
            {episodes.map(episode => (
              <Grid item xs={12} sm={6}>
                <Paper style={{ height: '100%' }}>
                  <Box p={2}>
                    <EpisodeCard {...episode} show={show} />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Box mB={4}>
        <Typography variant="title">Show info</Typography>
        <Info show={show} />
      </Box>
    </>
  );
};

export default ShowDetails;
