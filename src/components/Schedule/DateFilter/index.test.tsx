import * as React from 'react';
import { shallow } from 'enzyme';
import DateFilter from './index';

it('renders without crashing', () => {
  shallow(<DateFilter value="today" />);
});
