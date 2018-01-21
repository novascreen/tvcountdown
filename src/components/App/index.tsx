import * as React from 'react';
import { Fragment } from 'react';
import withRoot from '../../withRoot';
import AppBar from '../AppBar';

export class App extends React.Component {
  render() {
    return (
      <Fragment>
        <AppBar />
      </Fragment>
    );
  }
}

export default withRoot(App);
