import React from 'react';
import { theme } from '../../theme/theme';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: {
      background: theme.colors.primary[500],
      color: 'white',
      border: 'none',
      ':hover': {
        background: theme.colors.primary[600],
      }
    },
    secondary: {
      background: theme.colors.secondary[600],
      color: 'white',
      border: 'none',
      ':hover': {
        background: theme.colors.secondary[700],
      }
    },
    outline: {
      background: 'transparent',
      color: theme.colors.dark.text.primary,
      border: `1px solid ${theme.colors.dark.border.primary}`,
      ':hover': {
        background: theme.colors.dark.surface.primary,
      }
    },
    ghost: {
      background: 'transparent',
      color: theme.colors.dark.text.muted,
      border: 'none',
      ':hover': {
        color: theme.colors.dark.text.primary,
      }
    },
    danger: {
      background: theme.colors.accent.red,
      color: 'white',
      border: 'none',
      ':hover': {
        background: '#dc2626',
      }
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
    },
    large: {
      padding: `${theme.spacing[4]} ${theme.spacing[6]}`,
      fontSize: theme.typography.fontSize.lg,
    }
  };

  const style = {
    ...variants[variant],
    ...sizes[size],
    borderRadius: theme.borderRadius.lg,
    fontWeight: theme.typography.fontWeight.medium,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: theme.transitions.base,
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing[2],
    fontFamily: theme.typography.fontFamily.sans.join(', '),
  };

  return (
    <button
      style={style}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;