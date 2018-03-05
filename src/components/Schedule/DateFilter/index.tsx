import * as React from 'react';
import Tabs, { Tab, TabsProps } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Box from 'components/UI/Box';
import Divider from 'material-ui/Divider';

const DateFilter = (props: TabsProps) => (
  <Box mV={2}>
    <AppBar position="static" color="inherit" elevation={0} square>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        scrollable
        scrollButtons="off"
        {...props}
      >
        {/* <Tab label="Last 7 days" value="last-7" /> */}
        {/* <Tab label="Yesterday" value="yesterday" /> */}
        <Tab label="Today" value="today" />
        {/* <Tab label="Tomorrow" value="tomorrow" /> */}
        <Tab label="Next week" value="next-7" />
      </Tabs>
    </AppBar>
    <Divider />
  </Box>
);

export default DateFilter;
