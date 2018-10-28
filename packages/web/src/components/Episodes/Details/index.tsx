import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import { Episode } from 'graphql/types';
import Box from 'components/UI/Box';
import HTML from 'components/Util/HTML';
import InlineDivider from 'components/UI/InlineDivider';

type Props = {
  episode: Episode;
};

export const EpisodeDetails = ({ episode }: Props) => {
  const genres = (episode.show && episode.show.genres) || [];

  const hasAired = moment(episode.airstamp || undefined).isBefore();
  return (
    <>
      <Box mB={3} mT={3}>
        {episode.show && (
          <Link to={`/shows/${episode.show.id}`}>
            <Typography variant="subheading">
              {episode.show.name} ({episode.show.airedYears})
            </Typography>
          </Link>
        )}
        <Typography variant="display1">{episode.name}</Typography>
        <Box mB={1}>
          <Typography variant="caption">
            {episode.runtime} min
            <InlineDivider />
            {Boolean(genres.length) && (
              <>
                {genres.join(', ')}
                <InlineDivider />
              </>
            )}
            {hasAired ? 'Episode aired' : 'Episode airs'}{' '}
            {episode.airstamp && (
              <FormattedDate
                value={episode.airstamp}
                month="long"
                day="numeric"
                year="numeric"
              />
            )}
          </Typography>
        </Box>
        <Divider />
      </Box>
      <Box mB={4}>
        <Typography component="div">
          {episode.image &&
            episode.image.medium && (
              <Box pR={2} style={{ float: 'left', maxWidth: '40%' }}>
                <img
                  src={episode.image.medium}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Box>
            )}
          {episode.summary && <HTML content={episode.summary} />}
        </Typography>
      </Box>
    </>
  );
};

export default EpisodeDetails;
