import * as React from 'react';
import { Fragment } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Box from 'components/UI/Box';
import AllShowsSchedule from 'components/Schedule/AllShowsSchedule';
import FavoritesSchedule from 'components/Schedule/FavoritesSchedule';

export class CountdownPage extends React.Component {
  state = {
    shows: 'all',
  };

  handleShowsChange = (e: any, value: string) => {
    this.setState({ shows: value });
  };

  render() {
    const { shows } = this.state;
    return (
      <Fragment>
        <Box mV={2}>
          <AppBar position="static" color="default" elevation={0} square>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              centered
              // scrollable
              // scrollButtons="off"
              fullWidth
              value={shows}
              onChange={this.handleShowsChange}
            >
              <Tab label="All shows" value="all" />
              <Tab label="Favorite shows" value="favorites" />
            </Tabs>
          </AppBar>
        </Box>
        {shows === 'all' && <AllShowsSchedule />}
        {shows === 'favorites' && <FavoritesSchedule />}
      </Fragment>
    );
  }
}

export default CountdownPage;
