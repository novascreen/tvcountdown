import * as React from 'react';
import { shallow } from 'enzyme';
import { EpisodeList, Props } from './index';
import { getMockRouterProps } from 'mock/getMockRouterProps';

it('renders without crashing', () => {
  const routerProps = getMockRouterProps<Props>({});
  shallow(<EpisodeList {...routerProps} />);
});
