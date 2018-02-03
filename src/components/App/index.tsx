import * as React from 'react';
import { Fragment } from 'react';
import * as moment from 'moment';

import withRoot from 'withRoot';
import AppBar from 'components/AppBar';
import Schedule from 'components/Schedule';

export class App extends React.Component {
  render() {
    const currentDate = moment().format('YYYY-MM-DD');
    return (
      <Fragment>
        <AppBar />
        <Schedule date={currentDate} />
      </Fragment>
    );
  }
}

export default withRoot(App);
