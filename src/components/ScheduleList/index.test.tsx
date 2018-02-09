import * as React from 'react';
import { shallow } from 'enzyme';
import { ScheduleList } from './index';

it('renders without crashing', () => {
  shallow(
    <ScheduleList date="" />
  );
});
