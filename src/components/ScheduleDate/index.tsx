import * as React from 'react';
import Tabs, { Tab, TabsProps } from 'material-ui/Tabs';

const ScheduleDate = (props: TabsProps) => (
  <Tabs
    indicatorColor="primary"
    textColor="primary"
    centered
    {...props}
  >
    <Tab label="Last 7 days" value="last-7" />
    <Tab label="Yesterday" value="yesterday" />
    <Tab label="Today" value="today" />
    <Tab label="Tomorrow" value="tomorrow" />
    <Tab label="Next 7 days" value="next-7" />
  </Tabs>
);

export default ScheduleDate;
