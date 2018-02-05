import * as React from 'react';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import Grid from 'material-ui/Grid/Grid';
import withStyles, { WithStyles, StyleRules } from 'material-ui/styles/withStyles';

import Box from 'components/UI/Box';
import { NavigationItem } from './index';

const styles: StyleRules<'indicator'> = {
  indicator: {
    display: 'none',
  },
};

type Props = {
  items: NavigationItem[],
  value: string,
  onChange: () => void,
};

type PropsWithStyles = WithStyles<'indicator'>;

export const TopNavigation: React.SFC<Props & PropsWithStyles> = ({
  classes,
  items = [],
  value,
  onChange,
}) => (
  <Tabs
    value={value}
    onChange={onChange}
    indicatorClassName={classes.indicator}
  >
    {items.map(({ label, Icon, ...item }) => (
      <Tab
        key={item.value}
        label={(
          <Box pH={2}>
            <Grid container alignItems="center">
              <Box mR={1}><Icon /></Box>{label}
            </Grid>
          </Box>
        )}
        value={item.value}
      />
    ))}
  </Tabs>
);

export default (
  withStyles(styles)
)<Props>(TopNavigation);
