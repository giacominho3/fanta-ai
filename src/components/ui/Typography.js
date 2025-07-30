import React from 'react';
import { theme } from '../../theme/theme';

export const Heading = ({ 
  level = 1, 
  children, 
  color = 'primary',
  className = '',
  ...props 
}) => {
  const Tag = `h${level}`;
  
  const colors = {
    primary: theme.colors.dark.text.primary,
    secondary: theme.colors.dark.text.secondary,
    accent: theme.colors.primary[500],
  };

  const sizes = {
    1: theme.typography.fontSize['4xl'],
    2: theme.typography.fontSize['2xl'],
    3: theme.typography.fontSize.xl,
    4: theme.typography.fontSize.lg,
    5: theme.typography.fontSize.base,
    6: theme.typography.fontSize.sm,
  };

  const style = {
    color: colors[color],
    fontSize: sizes[level],
    fontWeight: theme.typography.fontWeight.bold,
    margin: 0,
    fontFamily: theme.typography.fontFamily.sans.join(', '),
  };

  return (
    <Tag style={style} className={className} {...props}>
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
  ...props 
}) => {
  const colors = {
    primary: theme.colors.dark.text.primary,
    secondary: theme.colors.dark.text.secondary,
    muted: theme.colors.dark.text.tertiary,
    accent: theme.colors.primary[500],
  };

  const style = {
    color: colors[color],
    fontSize: theme.typography.fontSize[size],
    fontWeight: theme.typography.fontWeight[weight],
    margin: 0,
    fontFamily: theme.typography.fontFamily.sans.join(', '),
  };

  return (
    <p style={style} className={className} {...props}>
      {children}
    </p>
  );
};