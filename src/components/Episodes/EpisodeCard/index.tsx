import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormattedDate } from 'react-intl';
import Typography from 'material-ui/Typography';

import { Episode as EpisodeType, Show } from 'api/models';
import SeasonNumber from 'components/Episodes/SeasonNumber';
import HTML from 'components/Util/HTML';

type Props = {
  title: string;
  episode: EpisodeType;
  show: Show;
};

export const EpisodeCard = ({ title, episode, show }: Props) => (
  <>
    <Typography variant="title">{title}</Typography>
    <Link to={`/shows/${show.id}/episodes/${episode.id}`}>
      <Typography variant="subheading">{episode.name}</Typography>
    </Link>
    <Typography variant="body2" component="h4">
      <SeasonNumber episode={episode} />
      {' - '}
      <FormattedDate
        value={episode.airstamp}
        month="short"
        day="numeric"
        year="numeric"
      />
    </Typography>
    <Typography component="div">
      <HTML content={episode.summary} />
    </Typography>
  </>
);

export default EpisodeCard;
