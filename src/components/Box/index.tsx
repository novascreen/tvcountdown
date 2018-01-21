import * as React from 'react';
import withTheme, { WithTheme } from 'material-ui/styles/withTheme';

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
  p?: number;
  pH?: number;
  pV?: number;
  pT?: number;
  pR?: number;
  pB?: number;
  pL?: number;
  m?: number;
  mH?: number;
  mV?: number;
  mT?: number;
  mR?: number;
  mB?: number;
  mL?: number;
  childrenOnly?: boolean;
  color?: string;
  border?: number;
  borderWidth?: number;
  borderRadius?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Box = (
  withTheme()
)(({
  theme,
  childrenOnly = false,
  color,
  border,
  borderWidth = 1,
  borderRadius = 2,
  style,
  children,
  ...props
}: WithTheme & BoxProps) => {
  if (childrenOnly) { return React.Children.only(children); }

  const spacing = {};
  attributeProps.forEach((prop, i) => {
    if (props[prop]) {
      attributes[i].forEach((attr) => {
        spacing[attr] = theme.spacing.unit * props[prop];
      });
    }
  });

  const primaryMain = (theme.palette.primary as { main: string }).main;
  const secondaryMain = (theme.palette.secondary as { main: string }).main;
  const errorMain = (theme.palette.error as { main: string }).main;

  const colors = {
    default: {
      color: theme.palette.getContrastText(theme.palette.grey[100]),
      backgroundColor: theme.palette.grey[100],
    },
    primary: {
      color: theme.palette.getContrastText(primaryMain),
      backgroundColor: primaryMain,
    },
    accent: {
      color: theme.palette.getContrastText(secondaryMain),
      backgroundColor: secondaryMain,
    },
  };

  const borders = {
    default: theme.palette.text.divider,
    error: errorMain,
    primary: primaryMain,
    accent: secondaryMain,
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
