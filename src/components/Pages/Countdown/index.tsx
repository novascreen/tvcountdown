import * as React from 'react';
import { Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import * as qs from 'query-string';
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

export class CountdownPage extends React.Component<RouteComponentProps<{}>> {
  get query() {
    return {
      shows: 'all',
      time: 'upcoming',
      ...qs.parse(this.props.location.search),
    };
  }

  handleShowsChange = (e: any, value: string) => {
    const { history } = this.props;
    history.push(`/?shows=${value}`);
  };

  handleTimeChange = (e: any) => {
    const { history } = this.props;
    history.push(`/?shows=${this.query.shows}&time=${e.target.value}`);
  };

  render() {
    const { shows, time } = this.query;
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
              <TimeSelector value={time} onChange={this.handleTimeChange} />
            </Toolbar>
          </AppBar>
          <Divider />
        </Box>
        {shows === 'all' && <AllShowsSchedule previous={previous} />}
        {shows === 'favorites' && <FavoritesSchedule previous={previous} />}
      </Fragment>
    );
  }
}

export default CountdownPage;
