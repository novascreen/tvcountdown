import * as R from 'ramda';

import { getScheduleByDate } from '../../tvmaze/api';
import { combineResults } from '../../utils';

const eqIdAirstamp = (a, b) =>
  R.eqProps('id', a, b) && R.eqProps('airstamp', a, b);

export default function scheduleByDate(
  parent: any,
  { date }: { date: string },
) {
  const dates = date.split(',');
  if (dates.length > 1) {
    return (
      Promise.all(dates.map(d => getScheduleByDate(d)))
        .then(combineResults)
        // Filter duplicates (midnight episodes)
        .then(results => R.uniqWith(eqIdAirstamp, results))
    );
  }
  return getScheduleByDate(date);
}
