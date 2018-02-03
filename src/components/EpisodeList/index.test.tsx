import * as React from 'react';
import { shallow } from 'enzyme';
import { EpisodeList } from './index';

it('renders without crashing', () => {
  shallow(<EpisodeList />);
});
