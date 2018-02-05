import * as React from 'react';
import Schedule from 'material-ui-icons/Schedule';
import Star from 'material-ui-icons/Star';
import { SvgIconProps } from 'material-ui/SvgIcon';

import TopNavigation from './TopNavigation';
import BottomNavigation from './BottomNavigation';

export type NavigationItem = {
  label: string,
  Icon: React.ReactType<SvgIconProps>,
  value: string,
};

const items: NavigationItem[] = [{
  label: 'Schedule',
  Icon: Schedule,
  value: 'schedule',
}, {
  label: 'Favorites',
  Icon: Star,
  value: 'favorites',
}];

type Props = {
  position?: | 'top' | 'bottom',
  value?: string,
  onChange?: () => void,
};

export const Navigation = ({
  position = 'top',
  value = 'schedule',
  onChange = () => null,
}: Props) => {
  const Component = position === 'top' ? TopNavigation : BottomNavigation;
  return <Component {...{ items, value, onChange }} />;
};

export default Navigation;
