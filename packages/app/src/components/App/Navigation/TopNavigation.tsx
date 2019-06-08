import React from 'react';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid/Grid';
import withStyles, {
  WithStyles,
  StyleRulesCallback,
} from '@material-ui/core/styles/withStyles';

import Box from 'components/UI/Box';
import { NavigationItem } from './index';

type Props = {
  items: NavigationItem[];
  value: string;
  onChange: (e: any, value: string) => void;
};

export const TopNavigation: React.SFC<Props & WithStyles<Styles>> = ({
  classes,
  items = [],
  value,
  onChange,
}) => (
  <Tabs
    value={value}
    onChange={onChange}
    classes={{ indicator: classes.indicator }}
  >
    {items.map(({ label, Icon, ...item }) => (
      <Tab
        key={item.value}
        classes={{
          root: classes.tabRoot,
        }}
        label={
          <Box px={2}>
            <Grid container alignItems="center" spacing={2}>
              <Box mr={1}>
                <Icon />
              </Box>
              {label}
            </Grid>
          </Box>
        }
        value={item.value}
      />
    ))}
  </Tabs>
);

type Styles = 'indicator' | 'tabRoot';

const styles: StyleRulesCallback<Styles> = theme => ({
  indicator: {
    display: 'none',
  },
  tabRoot: {
    [theme.breakpoints.up('md')]: {
      minWidth: 72,
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
    },
  },
});

export default withStyles(styles)(TopNavigation);
