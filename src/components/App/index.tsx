import * as React from 'react';
import { Fragment } from 'react';
import withRoot from '../../withRoot';
import AppBar from '../AppBar';
import Schedule from '../Schedule';

export class App extends React.Component {
  render() {
    return (
      <Fragment>
        <AppBar />
        <Schedule date="2018-01-21" />
      </Fragment>
    );
  }
}

export default withRoot(App);
