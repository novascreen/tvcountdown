import * as React from 'react';
import { Fragment } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import AllInclusive from 'material-ui-icons/AllInclusive';
import Star from 'material-ui-icons/Star';
import Box from 'components/UI/Box';
import AllShowsSchedule from 'components/Schedule/AllShowsSchedule';
import FavoritesSchedule from 'components/Schedule/FavoritesSchedule';
import TimeSelector from 'components/Schedule/TimeSelector';
import Divider from 'material-ui/Divider';

export class CountdownPage extends React.Component {
  state = {
    shows: 'all',
    time: 'upcoming',
  };

  handleShowsChange = (e: any, value: string) => {
    this.setState({ shows: value });
  };

  handleTimeChange = (e: any) => {
    this.setState({ time: e.target.value });
  };

  render() {
    const { shows, time } = this.state;
    const previous = time === 'previous';
    return (
      <Fragment>
        <Box mB={2}>
          <AppBar position="static" color="inherit" elevation={0} square>
            <Toolbar disableGutters style={{ justifyContent: 'space-between' }}>
              <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={shows}
                onChange={this.handleShowsChange}
                fullWidth
              >
                <Tab label="All shows" icon={<AllInclusive />} value="all" />
                <Tab label="Favorite shows" icon={<Star />} value="favorites" />
              </Tabs>
              {shows === 'favorites' && (
                <TimeSelector value={time} onChange={this.handleTimeChange} />
              )}
            </Toolbar>
          </AppBar>
          <Divider />
        </Box>
        {shows === 'all' && <AllShowsSchedule />}
        {shows === 'favorites' && <FavoritesSchedule previous={previous} />}
      </Fragment>
    );
  }
}

export default CountdownPage;
