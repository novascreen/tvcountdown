import * as React from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';

import { Episode } from 'models/graphql';
import Box from 'components/UI/Box';
import HTML from 'components/Util/HTML';
import InlineDivider from 'components/UI/InlineDivider';

type Props = {
  episode: Episode;
};

export const EpisodeDetails = ({ episode }: Props) => {
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
            {episode.runtime} min<InlineDivider />
            {episode.show &&
              episode.show.genres &&
              episode.show.genres.join(', ')}{' '}
            <InlineDivider />
            Episode aired{' '}
            <FormattedDate
              value={episode.airstamp}
              month="long"
              day="numeric"
              year="numeric"
            />
          </Typography>
        </Box>
        <Divider />
      </Box>
      <Box mB={4}>
        <Typography>
          {episode.image && (
            <Box pR={2} style={{ float: 'left', maxWidth: '40%' }}>
              <img
                src={episode.image.medium}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Box>
          )}
          <HTML content={episode.summary} />
        </Typography>
      </Box>
    </>
  );
};

export default EpisodeDetails;
