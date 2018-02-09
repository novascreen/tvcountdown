import * as React from 'react';
import MUIBottomNavigation from 'material-ui/BottomNavigation/BottomNavigation';
import BottomNavigationAction from 'material-ui/BottomNavigation/BottomNavigationAction';
import AppBar from 'material-ui/AppBar/AppBar';
import withStyles, { WithStyles, StyleRules } from 'material-ui/styles/withStyles';

import { NavigationItem } from './index';

const styles: StyleRules<'root'> = {
  root: {
    top: 'auto',
    bottom: 0,
  },
};

type Props = {
  items: NavigationItem[],
  value: string,
  onChange: (e: any, value: string) => void,
};

type PropsWithStyles = WithStyles<'root'>;

export const BottomNavigation: React.SFC<Props & PropsWithStyles> = ({
  classes,
  items = [],
  value,
  onChange,
}) => (
  <AppBar position="fixed" className={classes.root}>
    <MUIBottomNavigation
      value={value}
      onChange={onChange}
      showLabels
    >
      {items.map(({ label, Icon, ...item }) => (
        <BottomNavigationAction
          key={item.value}
          label={label}
          icon={<Icon />}
          value={item.value}
        />
      ))}
    </MUIBottomNavigation>
  </AppBar>
);

export default (
  withStyles(styles)
)<Props>(BottomNavigation);
