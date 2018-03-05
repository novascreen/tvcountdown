import * as React from 'react';
import { Fragment } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import AllInclusive from 'material-ui-icons/AllInclusive';
import Star from 'material-ui-icons/Star';
import Box from 'components/UI/Box';
import AllShowsSchedule from 'components/Schedule/AllShowsSchedule';
import FavoritesSchedule from 'components/Schedule/FavoritesSchedule';
import Divider from 'material-ui/Divider';

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
        <Box mB={2}>
          <AppBar position="static" color="inherit" elevation={0} square>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              value={shows}
              onChange={this.handleShowsChange}
            >
              <Tab label="All shows" icon={<AllInclusive />} value="all" />
              <Tab label="Favorite shows" icon={<Star />} value="favorites" />
            </Tabs>
          </AppBar>
          <Divider />
        </Box>
        {shows === 'all' && <AllShowsSchedule />}
        {shows === 'favorites' && <FavoritesSchedule />}
      </Fragment>
    );
  }
}

export default CountdownPage;
