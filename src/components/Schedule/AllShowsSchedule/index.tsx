import * as React from 'react';
import { Fragment } from 'react';

import AllShowsList from 'components/Schedule/AllShowsList';

type Props = {
  previous?: boolean;
};

export class AllShowsSchedule extends React.Component<Props> {
  render() {
    const { previous } = this.props;
    return (
      <Fragment>
        <AllShowsList previous={previous} />
      </Fragment>
    );
  }
}

export default AllShowsSchedule;
