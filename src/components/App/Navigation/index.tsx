import * as React from 'react';
import Schedule from '@material-ui/icons/Schedule';
import LiveTv from '@material-ui/icons/LiveTv';
// import Star from '@material-ui/icons/Star';
import { SvgIconProps } from 'material-ui/SvgIcon';
import { withRouter, RouteComponentProps } from 'react-router';

import TopNavigation from './TopNavigation';
import BottomNavigation from './BottomNavigation';

export type NavigationItem = {
  label: string;
  Icon: React.ReactType<SvgIconProps>;
  value: string;
};

const items: NavigationItem[] = [
  {
    label: 'Countdown',
    Icon: Schedule,
    value: '/',
  },
  {
    label: 'Shows',
    Icon: LiveTv,
    value: '/shows',
  },
];

type Props = {
  position?: 'top' | 'bottom';
};

export class Navigation extends React.Component<
  RouteComponentProps<{}> & Props
> {
  handleChange = (e: any, value: string) => {
    this.props.history.push(value);
  };

  render() {
    const { position = 'top', location } = this.props;
    const Component = position === 'top' ? TopNavigation : BottomNavigation;
    return (
      <Component
        {...{
          items,
          value: location.pathname,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

export default withRouter<RouteComponentProps<{}> & Props>(Navigation);
