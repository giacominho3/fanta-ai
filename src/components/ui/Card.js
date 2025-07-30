import React from 'react';
import { theme, gradients } from '../../theme/theme';

const Card = ({ 
  children, 
  variant = 'default',
  hover = false,
  className = '',
  ...props 
}) => {
  const variants = {
    default: {
      background: theme.colors.dark.surface.primary,
      border: `1px solid ${theme.colors.dark.border.primary}`,
    },
    elevated: {
      background: gradients.elevated,
      border: `1px solid ${theme.colors.dark.border.primary}`,
    },
    success: {
      background: 'rgba(34, 197, 94, 0.2)',
      border: `1px solid ${theme.colors.dark.border.accent}`,
    },
    glass: {
      background: theme.colors.dark.surface.primary,
      backdropFilter: 'blur(12px)',
      border: `1px solid ${theme.colors.dark.border.primary}`,
    }
  };

  const style = {
    ...variants[variant],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[6],
    transition: theme.transitions.base,
    ...(hover && {
      cursor: 'pointer',
      ':hover': {
        background: gradients.elevated,
        transform: 'scale(1.05)',
      }
    })
  };

  return (
    <div
      style={style}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;