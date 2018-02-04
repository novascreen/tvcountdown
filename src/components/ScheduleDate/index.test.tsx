import * as React from 'react';
import { shallow } from 'enzyme';
import ScheduleDate from './index';

it('renders without crashing', () => {
  shallow(
    <ScheduleDate value="today" />
  );
});
