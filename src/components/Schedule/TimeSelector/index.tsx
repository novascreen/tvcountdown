import * as React from 'react';
import Select, { SelectProps } from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

const TimeSelector = (props: SelectProps) => (
  <Select {...props}>
    <MenuItem value="upcoming">Upcoming</MenuItem>
    <MenuItem value="previous">Previous</MenuItem>
  </Select>
);

export default TimeSelector;
