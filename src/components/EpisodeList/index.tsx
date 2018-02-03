import * as React from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Grid from 'material-ui/Grid/Grid';
import { FormattedDate, FormattedTime, FormattedRelative } from 'react-intl';
import Typography from 'material-ui/Typography/Typography';

import { Episode } from 'models/graphql';

interface Props {
  episodes: Episode[];
}

export const EpisodeList: React.SFC<Props> = ({
  episodes
}) => {
  return (
    <List>
      {episodes.map(episode => {
        const episodeSeason = (episode.season || 0).toString().padStart(2, '0');
        const episodeNumber = (episode.number || 0).toString().padStart(2, '0');
        return (
          <ListItem key={episode.id}>
            <Grid container>
              <Grid item xs={6}>
                <Typography>{episode.show.name}</Typography>
                <Typography type="caption">
                  S{episodeSeason}
                  E{episodeNumber} - {episode.name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography><FormattedRelative value={episode.airstamp} /></Typography>
                <Typography type="caption">
                  <FormattedDate value={episode.airstamp} />{' '}
                  <FormattedTime value={episode.airstamp} />
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
    </List>
  );
};

export default EpisodeList;
