import React from 'react';
import { shallow } from 'enzyme';
import { EpisodesList, Props } from './List';
import { getMockRouterProps } from 'mock/getMockRouterProps';

it('renders without crashing', () => {
  const routerProps = getMockRouterProps<Props>({});
  shallow(<EpisodesList width="xs" {...routerProps} />);
});
