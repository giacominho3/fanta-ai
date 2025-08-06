import React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { theme } from '../theme/theme';

const SortableHeader = ({ 
  children, 
  field, 
  sortField, 
  sortDirection, 
  onSort,
  sortable = false,
  style = {},
  ...props 
}) => {
  const isSorted = sortField === field;
  
  const getSortIcon = () => {
    if (!sortable) return null;
    
    if (!isSorted) {
      return <ChevronsUpDown size={12} style={{ opacity: 0.5 }} />;
    }
    
    return sortDirection === 'asc' ? 
      <ChevronUp size={12} color={theme.colors.primary[500]} /> : 
      <ChevronDown size={12} color={theme.colors.primary[500]} />;
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[1],
    cursor: sortable ? 'pointer' : 'default',
    userSelect: 'none',
    padding: sortable ? theme.spacing[1] : 0,
    borderRadius: theme.borderRadius.base,
    transition: theme.transitions.fast,
    color: isSorted ? theme.colors.primary[400] : theme.colors.dark.text.tertiary,
    fontWeight: isSorted ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.semibold,
    ...(sortable && {
      ':hover': {
        background: 'rgba(255, 255, 255, 0.1)',
      }
    }),
    ...style
  };

  const handleClick = () => {
    if (sortable && onSort) {
      onSort(field);
    }
  };

  return (
    <div 
      style={headerStyle}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (sortable) {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (sortable) {
          e.target.style.background = 'transparent';
        }
      }}
      {...props}
    >
      {children}
      {getSortIcon()}
    </div>
  );
};

export default SortableHeader;