import * as React from 'react';
import Tabs, { Tab, TabsProps } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Box from 'components/UI/Box';

const ScheduleDate = (props: TabsProps) => (
  <Box mV={2}>
    <AppBar position="static" color="default" elevation={0} square>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        centered
        scrollable
        scrollButtons="off"
        fullWidth
        {...props}
      >
        <Tab label="Last 7 days" value="last-7" />
        <Tab label="Yesterday" value="yesterday" />
        <Tab label="Today" value="today" />
        <Tab label="Tomorrow" value="tomorrow" />
        <Tab label="Next 7 days" value="next-7" />
      </Tabs>
    </AppBar>
  </Box>
);

export default ScheduleDate;
