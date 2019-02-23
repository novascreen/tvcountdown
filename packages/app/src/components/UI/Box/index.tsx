import React from 'react';
import withTheme, { WithTheme } from '@material-ui/core/styles/withTheme';

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

interface BoxProps<T> extends React.HTMLAttributes<T> {
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
  children?: any;
}

export const Box: React.SFC<WithTheme & BoxProps<{}>> = ({
  theme,
  childrenOnly = false,
  color,
  border,
  borderWidth = 1,
  borderRadius = 2,
  style,
  children,
  ...otherProps
}) => {
  const props: any = otherProps;
  if (childrenOnly) {
    return React.Children.only(children);
  }

  const spacing: any = {};
  attributeProps.forEach((prop: string, i) => {
    if (props[prop]) {
      attributes[i].forEach(attr => {
        spacing[attr] = theme.spacing.unit * props[prop];
      });
      delete props[prop];
    }
  });

  const primaryMain = theme.palette.primary.main;
  const secondaryMain = theme.palette.secondary.main;
  const errorMain = theme.palette.error.main;

  const colors: any = {
    default: {
      color: theme.palette.getContrastText(theme.palette.grey[100]),
      backgroundColor: theme.palette.grey[100],
    },
    primary: {
      color: theme.palette.getContrastText(primaryMain),
      backgroundColor: primaryMain,
    },
    secondary: {
      color: theme.palette.getContrastText(secondaryMain),
      backgroundColor: secondaryMain,
    },
  };

  const borders: any = {
    default: theme.palette.text.disabled,
    error: errorMain,
    primary: primaryMain,
    secondary: secondaryMain,
  };

  const borderStyles =
    border && borders[border]
      ? {
          border: `${borderWidth}px solid`,
          borderColor: borders[border],
          borderRadius,
        }
      : {};

  const rest: any = {};
  Object.keys(props)
    .filter(prop => !attributeProps.includes(prop))
    .forEach((prop) => {
      rest[prop] = props[prop];
    });

  return (
    <div
      {...props}
      style={{
        ...style,
        ...spacing,
        ...((color && colors[color]) || {}),
        ...borderStyles,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default withTheme()(Box);
