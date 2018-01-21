import * as React from 'react';
import { Fragment } from 'react';
import { withTheme } from 'material-ui/styles';
import { WithTheme } from 'material-ui/styles/withTheme';

const attributeProps = [
  'p',
  'pH',
  'pV',
  'pT',
  'pR',
  'pB',
  'pL',
  'm',
  'mH',
  'mV',
  'mT',
  'mR',
  'mB',
  'mL',
];

const attributes = [
  ['padding'],
  ['paddingRight', 'paddingLeft'],
  ['paddingTop', 'paddingBottom'],
  ['paddingTop'],
  ['paddingRight'],
  ['paddingBottom'],
  ['paddingLeft'],
  ['margin'],
  ['marginRight', 'marginLeft'],
  ['marginTop', 'marginBottom'],
  ['marginTop'],
  ['marginRight'],
  ['marginBottom'],
  ['marginLeft'],
];

interface BoxProps {
  fragment?: boolean;
  color?: string;
  border?: number;
  borderWidth?: number;
  borderRadius?: number;
  style?: React.CSSProperties;
  children?: React.ReactChildren;
}

const Box = (
  withTheme()
)(({
  theme,
  fragment = false,
  color,
  border,
  borderWidth = 1,
  borderRadius = 2,
  style,
  children,
  ...props
}: BoxProps & WithTheme) => {
  if (fragment) { return <Fragment>{children}</Fragment>; }

  const spacing = {};
  attributeProps.forEach((prop, i) => {
    if (props[prop]) {
      attributes[i].forEach((attr) => {
        spacing[attr] = theme.spacing.unit * props[prop];
      });
    }
  });

  const colors = {
    default: {
      color: theme.palette.getContrastText(theme.palette.grey[100]),
      backgroundColor: theme.palette.grey[100],
    },
    primary: {
      color: theme.palette.getContrastText(theme.palette.primary[500]),
      backgroundColor: theme.palette.primary[500],
    },
    accent: {
      color: theme.palette.getContrastText(theme.palette.secondary[500]),
      backgroundColor: theme.palette.secondary[500],
    },
  };

  const borders = {
    default: theme.palette.text.divider,
    error: theme.palette.error[500],
    primary: theme.palette.primary[500],
    accent: theme.palette.secondary[500],
  };

  const borderStyles = border && borders[border] ? {
    border: `${borderWidth}px solid`,
    borderColor: borders[border],
    borderRadius,
  } : {};

  const rest = {};
  Object.keys(props).filter(prop => !attributeProps.includes(prop)).forEach((prop) => {
    rest[prop] = props[prop];
  });

  return (
    <div
      style={{
        ...style,
        ...spacing,
        ...((color && colors[color]) || {}),
        ...(borderStyles),
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

Box.displayName = 'BoxComposed';

export default Box;
