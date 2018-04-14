import * as React from 'react';
import Paper from 'material-ui/Paper';
import List, { ListItem } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import { FormattedDate, FormattedTime, FormattedRelative } from 'react-intl';
import Typography from 'material-ui/Typography/Typography';
import ListItemSecondaryAction from 'material-ui/List/ListItemSecondaryAction';
import * as Infinite from 'react-infinite';
import { withRouter, RouteComponentProps } from 'react-router';

import { Episode } from 'api/models';
import FavoriteToggle from 'components/Shows/FavoriteToggle';

export interface Props {
  episodes?: Episode[];
}

export class EpisodesList extends React.Component<
  RouteComponentProps<{}> & Props
> {
  handleEpisodeClick = (episode: Episode) => () => {
    if (episode.show) {
      this.props.history.push(
        `/shows/${episode.show.id}/episodes/${episode.id}`,
      );
    }
  };

  render() {
    const { episodes = [] } = this.props;
    return (
      <Paper>
        <List>
          <Infinite elementHeight={65.5} useWindowAsScrollContainer>
            {episodes.map((episode, i) => {
              const episodeSeason = (episode.season || 0)
                .toString()
                .padStart(2, '0');
              const episodeNumber = (episode.number || 0)
                .toString()
                .padStart(2, '0');
              const isLast = episodes.length - 1 === i;
              return (
                <ListItem
                  key={`${episode.id}-${episode.airstamp}`}
                  divider={!isLast}
                  button
                  onClick={this.handleEpisodeClick(episode)}
                >
                  <Grid container spacing={16}>
                    <Grid item xs={12} sm={7}>
                      {episode.show && (
                        <Typography variant="subheading">
                          {episode.show.name}
                        </Typography>
                      )}
                      <Typography variant="caption" component="div">
                        S{episodeSeason}
                        E{episodeNumber} - {episode.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Typography>
                        <FormattedRelative value={episode.airstamp} />
                      </Typography>
                      <Typography variant="caption" component="div">
                        <FormattedDate value={episode.airstamp} />{' '}
                        <FormattedTime value={episode.airstamp} />
                      </Typography>
                    </Grid>
                  </Grid>
                  {episode.show && (
                    <ListItemSecondaryAction>
                      <FavoriteToggle showId={episode.show.id} />
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              );
            })}
          </Infinite>
        </List>
      </Paper>
    );
  }
}

export default withRouter<RouteComponentProps<{}> & Props>(EpisodesList);
