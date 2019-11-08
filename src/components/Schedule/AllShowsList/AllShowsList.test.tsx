import React from 'react';
import { shallow } from 'enzyme';
import { AllShowsList } from './AllShowsList';

it('renders without crashing', () => {
  shallow(<AllShowsList previous={false} />);
});
