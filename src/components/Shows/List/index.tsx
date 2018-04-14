import * as React from 'react';
import { Fragment } from 'react';
import { Show } from 'api/models';

type Props = {
  shows: [Show];
};

export default ({ shows }: Props) => (
  <div>
    {!Boolean(shows.length)
      ? 'No favorite shows found'
      : shows.map(show => <Fragment key={show.id}>{show.name}</Fragment>)}
  </div>
);
