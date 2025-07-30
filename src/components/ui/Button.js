import React, { useState } from 'react';
import { theme } from '../../theme/theme';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
  style = {},
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary: {
      background: isHovered && !disabled ? theme.colors.primary[600] : theme.colors.primary[500],
      color: 'white',
      border: 'none',
      boxShadow: isHovered && !disabled ? theme.shadows.hover : theme.shadows.base,
    },
    secondary: {
      background: isHovered && !disabled ? theme.colors.secondary[700] : theme.colors.secondary[600],
      color: 'white',
      border: 'none',
      boxShadow: isHovered && !disabled ? theme.shadows.hover : theme.shadows.base,
    },
    outline: {
      background: isHovered && !disabled ? theme.colors.dark.surface.primary : 'transparent',
      color: theme.colors.dark.text.primary,
      border: `1px solid ${theme.colors.dark.border.primary}`,
      boxShadow: isHovered && !disabled ? theme.shadows.md : 'none',
    },
    ghost: {
      background: isHovered && !disabled ? theme.colors.dark.surface.primary : 'transparent',
      color: isHovered && !disabled ? theme.colors.dark.text.primary : theme.colors.dark.text.muted,
      border: 'none',
      boxShadow: 'none',
    },
    danger: {
      background: isHovered && !disabled ? '#dc2626' : theme.colors.accent.red,
      color: 'white',
      border: 'none',
      boxShadow: isHovered && !disabled ? theme.shadows.hover : theme.shadows.base,
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

  const buttonStyle = {
    ...variants[variant],
    ...sizes[size],
    borderRadius: theme.borderRadius.lg,
    fontWeight: theme.typography.fontWeight.medium,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: theme.transitions.fast,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[2],
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    transform: isHovered && !disabled ? 'translateY(-1px)' : 'translateY(0)',
    ...style,
  };

  return (
    <button
      style={buttonStyle}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;