import * as React from 'react';
import MUIBottomNavigation from '@material-ui/core/BottomNavigation/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from '@material-ui/core/AppBar/AppBar';
import withStyles, {
  WithStyles,
  StyleRules,
} from '@material-ui/core/styles/withStyles';

import { NavigationItem } from './index';

type Props = {
  items: NavigationItem[];
  value: string;
  onChange: (e: any, value: string) => void;
};

export const BottomNavigation: React.SFC<Props & WithStyles<Styles>> = ({
  classes,
  items = [],
  value,
  onChange,
}) => (
  <AppBar position="fixed" className={classes.root}>
    <MUIBottomNavigation value={value} onChange={onChange} showLabels>
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

type Styles = 'root';

const styles: StyleRules<Styles> = {
  root: {
    top: 'auto',
    bottom: 0,
  },
};

export default withStyles(styles)(BottomNavigation);
