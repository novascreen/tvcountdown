import React from 'react';
import { shallow } from 'enzyme';
import Box from './index';

it('renders without crashing', () => {
  shallow(<Box>Hello</Box>);
});
