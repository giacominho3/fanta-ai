import React from 'react';
import { theme } from '../../theme/theme';

const Grid = ({ 
  children,
  cols = 1,
  gap = 4,
  className = '',
  ...props 
}) => {
  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: theme.spacing[gap],
  };

  return (
    <div style={style} className={className} {...props}>
      {children}
    </div>
  );
};

export default Grid;