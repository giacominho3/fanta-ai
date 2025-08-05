import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { theme } from '../../theme/theme';

const StarRating = ({ 
  value = 0, 
  onChange, 
  maxStars = 5,
  color = theme.colors.accent.orange,
  readOnly = false,
  className = '',
  style = {}
}) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  
  const currentValue = parseInt(value) || 0;
  const displayValue = hoveredStar > 0 ? hoveredStar : currentValue;

  const handleStarClick = (starIndex) => {
    if (readOnly) return;
    
    // Se clicco sulla stessa stella che è già selezionata, resetto a 0
    const newValue = currentValue === starIndex ? 0 : starIndex;
    onChange?.(newValue);
  };

  const handleMouseEnter = (starIndex) => {
    if (!readOnly) {
      setHoveredStar(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoveredStar(0);
    }
  };

  return (
    <div 
      style={{
        display: 'flex',
        gap: '2px',
        cursor: readOnly ? 'default' : 'pointer',
        userSelect: 'none',
        ...style
      }}
      className={className}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: maxStars }, (_, index) => {
        const starIndex = index + 1;
        const isFilled = starIndex <= displayValue;
        const isHovered = !readOnly && hoveredStar > 0 && starIndex <= hoveredStar;
        
        return (
          <Star
            key={starIndex}
            size={15}
            fill={isFilled ? "#ffff00" : 'transparent'}
            stroke={"#ffff00"}
            color={isFilled ? color : "#ffff00"}
            style={{
              transition: theme.transitions.fast,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              opacity: readOnly ? 0.8 : 1,
              cursor: readOnly ? 'default' : 'pointer'
            }}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onClick={() => handleStarClick(starIndex)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;