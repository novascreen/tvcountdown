import * as React from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Grid from 'material-ui/Grid/Grid';
import { FormattedDate, FormattedTime, FormattedRelative } from 'react-intl';
import Typography from 'material-ui/Typography/Typography';
import ListItemSecondaryAction from 'material-ui/List/ListItemSecondaryAction';
import * as Infinite from 'react-infinite';

import { Episode } from 'models/graphql';
import FavoriteToggle from 'components/FavoriteToggle';

interface Props {
  episodes?: Episode[];
}

export const EpisodeList: React.SFC<Props> = ({
  episodes = [],
}) => {
  return (
    <List>
      <Infinite elementHeight={65.5} useWindowAsScrollContainer>
        {episodes.map(episode => {
          const episodeSeason = (episode.season || 0).toString().padStart(2, '0');
          const episodeNumber = (episode.number || 0).toString().padStart(2, '0');
          return (
            <ListItem key={`${episode.id}-${episode.airstamp}`} divider>
              <Grid container>
                <Grid item xs={12} sm={7}>
                  <Typography variant="subheading">{episode.show.name}</Typography>
                  <Typography variant="caption" component="div">
                    S{episodeSeason}
                    E{episodeNumber} - {episode.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Typography><FormattedRelative value={episode.airstamp} /></Typography>
                  <Typography variant="caption" component="div">
                    <FormattedDate value={episode.airstamp} />{' '}
                    <FormattedTime value={episode.airstamp} />
                  </Typography>
                </Grid>
              </Grid>
              <ListItemSecondaryAction>
                <FavoriteToggle showId={episode.show.id} />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </Infinite>
    </List>
  );
};

export default EpisodeList;
