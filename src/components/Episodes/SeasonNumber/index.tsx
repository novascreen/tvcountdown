import * as React from 'react';
import { Episode } from 'api/models';

type Props = {
  episode: Episode;
};

export const SeasonNumber = ({ episode }: Props) => {
  const episodeSeason = (episode.season || 0).toString().padStart(2, '0');
  const episodeNumber = (episode.number || 0).toString().padStart(2, '0');

  return (
    <>
      S{episodeSeason}E{episodeNumber}
    </>
  );
};

export default SeasonNumber;
