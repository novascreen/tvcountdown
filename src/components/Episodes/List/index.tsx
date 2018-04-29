import * as React from 'react';
import { compose } from 'react-apollo';
import Paper from 'material-ui/Paper';
import List, { ListItem } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import { FormattedDate, FormattedTime, FormattedRelative } from 'react-intl';
import Typography from 'material-ui/Typography/Typography';
import ListItemSecondaryAction from 'material-ui/List/ListItemSecondaryAction';
import * as Infinite from 'react-infinite';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import withWidth, { WithWidthProps } from 'material-ui/utils/withWidth';
import Avatar from 'material-ui/Avatar';

import { Episode } from 'api/models';
import FavoriteToggle from 'components/Shows/FavoriteToggle';
import Box from 'components/UI/Box';

export interface Props {
  episodes?: Episode[];
}

export class EpisodesList extends React.Component<
  RouteComponentProps<{}> & Props & WithWidthProps
> {
  render() {
    const { episodes = [], width } = this.props;
    const smallScreen = width === 'xs';
    return (
      <Paper>
        <List>
          <Infinite
            elementHeight={smallScreen ? 118.5 : 65.5}
            useWindowAsScrollContainer
          >
            {episodes.map((episode, i) => {
              if (!episode.show) return null;

              const show = episode.show;
              const showInitials = show.name.slice(0, 2).toUpperCase();
              const episodeSeason = (episode.season || 0).toString();
              const episodeNumber = (episode.number || 0)
                .toString()
                .padStart(2, '0');
              const isLast = episodes.length - 1 === i;

              return (
                <ListItem
                  key={`${episode.id}-${episode.airstamp}`}
                  divider={!isLast}
                >
                  <Box mR={2}>
                    {show.image ? (
                      smallScreen ? (
                        <img
                          src={show.image.medium}
                          style={{ width: 40, height: 'auto' }}
                        />
                      ) : (
                        <Avatar src={show.image.medium} />
                      )
                    ) : (
                      <Avatar>{showInitials}</Avatar>
                    )}
                  </Box>
                  <Grid container spacing={16}>
                    <Grid item xs={12} sm={7}>
                      <>
                        <Link to={`/shows/${show.id}`}>
                          <Typography variant="subheading">
                            {show.name}
                          </Typography>
                        </Link>
                        <Link to={`/shows/${show.id}/episodes/${episode.id}`}>
                          <Typography variant="caption" component="div">
                            {episodeSeason}
                            x{episodeNumber} - {episode.name}
                          </Typography>
                        </Link>
                      </>
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
                  <ListItemSecondaryAction>
                    <FavoriteToggle showId={show.id} />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </Infinite>
        </List>
      </Paper>
    );
  }
}

// withRouter<RouteComponentProps<{}> & Props>
export default compose(withRouter, withWidth())(EpisodesList);
