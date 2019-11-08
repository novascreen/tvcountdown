import React from 'react';

import AllShowsList from 'components/Schedule/AllShowsList/AllShowsList';

type Props = {
  previous?: boolean;
};

export const AllShowsSchedule: React.FC<Props> = ({ previous }) => (
  <AllShowsList previous={previous} />
);

export default AllShowsSchedule;
