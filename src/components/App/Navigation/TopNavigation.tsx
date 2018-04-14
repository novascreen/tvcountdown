import * as React from 'react';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import Grid from 'material-ui/Grid/Grid';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { Theme } from 'material-ui/styles/createMuiTheme';

import Box from 'components/UI/Box';
import { NavigationItem } from './index';

const styles = (theme: Theme) => ({
  indicator: {
    display: 'none',
  },
  tabRoot: {
    [theme.breakpoints.up('md')]: {
      minWidth: 72,
    },
  },
  tabLabelContainer: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 1.5,
      paddingRight: theme.spacing.unit * 1.5,
    },
  },
});

type Props = {
  items: NavigationItem[];
  value: string;
  onChange: (e: any, value: string) => void;
};

type PropsWithStyles = WithStyles<
  'indicator' | 'tabRoot' | 'tabLabelContainer'
>;

export const TopNavigation: React.SFC<Props & PropsWithStyles> = ({
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
          labelContainer: classes.tabLabelContainer,
        }}
        label={
          <Box pH={2}>
            <Grid container alignItems="center" spacing={16}>
              <Box mR={1}>
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

export default withStyles(styles)<Props>(TopNavigation);
