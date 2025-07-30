import React from 'react';
import { theme } from '../../theme/theme';

const Input = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  variant = 'default',
  size = 'medium',
  className = '',
  ...props 
}) => {
  const variants = {
    default: {
      background: theme.colors.dark.surface.primary,
      border: `1px solid ${theme.colors.dark.border.primary}`,
      color: theme.colors.dark.text.primary,
    },
    filled: {
      background: theme.colors.dark.surface.secondary,
      border: '1px solid transparent',
      color: theme.colors.dark.text.primary,
    },
    colored: {
      background: theme.colors.secondary[600],
      border: 'none',
      color: 'white',
    }
  };

  const sizes = {
    small: {
      padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
      fontSize: theme.typography.fontSize.sm,
    },
    medium: {
      padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
      fontSize: theme.typography.fontSize.base,
    }
  };

  const style = {
    ...variants[variant],
    ...sizes[size],
    borderRadius: theme.borderRadius.lg,
    outline: 'none',
    transition: theme.transitions.base,
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    width: '100%',
    ':focus': {
      borderColor: theme.colors.primary[500],
      outline: `2px solid ${theme.colors.primary[500]}`,
      outlineOffset: '0',
    }
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={style}
      className={className}
      {...props}
    />
  );
};

export default Input;