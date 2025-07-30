import React from 'react';
import { theme } from '../../theme/theme';

export const Heading = ({ 
  level = 1, 
  children, 
  color = 'primary',
  className = '',
  style = {},
  ...props 
}) => {
  const Tag = `h${level}`;
  
  const colors = {
    primary: theme.colors.dark.text.primary,
    secondary: theme.colors.dark.text.secondary,
    accent: theme.colors.primary[500],
    muted: theme.colors.dark.text.tertiary,
  };

  const sizes = {
    1: theme.typography.fontSize['4xl'],
    2: theme.typography.fontSize['2xl'],
    3: theme.typography.fontSize.xl,
    4: theme.typography.fontSize.lg,
    5: theme.typography.fontSize.base,
    6: theme.typography.fontSize.sm,
  };

  const weights = {
    1: theme.typography.fontWeight.extrabold,
    2: theme.typography.fontWeight.bold,
    3: theme.typography.fontWeight.semibold,
    4: theme.typography.fontWeight.semibold,
    5: theme.typography.fontWeight.medium,
    6: theme.typography.fontWeight.medium,
  };

  const headingStyle = {
    color: colors[color],
    fontSize: sizes[level],
    fontWeight: weights[level],
    margin: 0,
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    lineHeight: theme.typography.lineHeight.tight,
    ...style,
  };

  return (
    <Tag style={headingStyle} className={className} {...props}>
      {children}
    </Tag>
  );
};

export const Text = ({ 
  children,
  size = 'base',
  color = 'primary',
  weight = 'normal',
  className = '',
  style = {},
  ...props 
}) => {
  const colors = {
    primary: theme.colors.dark.text.primary,
    secondary: theme.colors.dark.text.secondary,
    muted: theme.colors.dark.text.tertiary,
    accent: theme.colors.primary[500],
  };

  const textStyle = {
    color: colors[color],
    fontSize: theme.typography.fontSize[size],
    fontWeight: theme.typography.fontWeight[weight],
    margin: 0,
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    lineHeight: theme.typography.lineHeight.normal,
    ...style,
  };

  return (
    <p style={textStyle} className={className} {...props}>
      {children}
    </p>
  );
};