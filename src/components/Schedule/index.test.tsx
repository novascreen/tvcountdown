import * as React from 'react';
import { shallow } from 'enzyme';
import { Schedule } from './index';

it('renders without crashing', () => {
  shallow(
    <Schedule date="" />
  );
});
