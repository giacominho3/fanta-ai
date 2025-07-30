import React, { useState } from 'react';
import { theme, gradients } from '../../theme/theme';

const Card = ({ 
  children, 
  variant = 'default',
  hover = false,
  className = '',
  onClick,
  style = {},
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    default: {
      background: theme.colors.dark.surface.primary,
      border: `1px solid ${theme.colors.dark.border.primary}`,
    },
    elevated: {
      background: isHovered && hover ? gradients.elevated : gradients.elevated,
      border: `1px solid ${theme.colors.dark.border.primary}`,
    },
    success: {
      background: 'rgba(34, 197, 94, 0.2)',
      border: `1px solid ${theme.colors.dark.border.accent}`,
    },
    glass: {
      background: isHovered && hover ? 
        'rgba(255, 255, 255, 0.15)' : 
        theme.colors.dark.surface.primary,
      backdropFilter: 'blur(12px)',
      border: `1px solid ${theme.colors.dark.border.primary}`,
    }
  };

  const cardStyle = {
    ...variants[variant],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[6],
    transition: theme.transitions.base,
    cursor: hover ? 'pointer' : 'default',
    transform: isHovered && hover ? 'scale(1.02)' : 'scale(1)',
    boxShadow: isHovered && hover ? theme.shadows.xl : theme.shadows.base,
    ...style,
  };

  const handleMouseEnter = () => {
    if (hover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e) => {
    if (onClick && hover) {
      onClick(e);
    }
  };

  return (
    <div
      style={cardStyle}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;