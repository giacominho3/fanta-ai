import { useState, useCallback, useMemo } from 'react';

export const useSorting = (data, getPlayerConfig) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' o 'desc'

  const handleSort = useCallback((field) => {
    if (sortField === field) {
      // Se clicco sulla stessa colonna, cambio direzione
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Se clicco su una nuova colonna, imposto ascendente
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  const sortedData = useMemo(() => {
    if (!sortField || !data.length) return data;

    return [...data].sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case 'prezzo':
          // Calcolo del prezzo basato sul budget
          const aBudget = parseFloat(getPlayerConfig(a.id, 'budget', '0')) || 0;
          const bBudget = parseFloat(getPlayerConfig(b.id, 'budget', '0')) || 0;
          aValue = Math.round(aBudget * 5);
          bValue = Math.round(bBudget * 5);
          break;
          
        case 'budget':
          aValue = parseFloat(getPlayerConfig(a.id, 'budget', '0')) || 0;
          bValue = parseFloat(getPlayerConfig(b.id, 'budget', '0')) || 0;
          break;
          
        case 'app':
          aValue = parseFloat(getPlayerConfig(a.id, 'pmal', '0')) || 0;
          bValue = parseFloat(getPlayerConfig(b.id, 'pmal', '0')) || 0;
          break;
          
        case 'fvm':
          aValue = parseFloat(a.fvm) || 0;
          bValue = parseFloat(b.fvm) || 0;
          break;
          
        default:
          return 0;
      }

      // Ordinamento numerico
      const comparison = aValue - bValue;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortField, sortDirection, getPlayerConfig]);

  const resetSort = useCallback(() => {
    setSortField(null);
    setSortDirection('asc');
  }, []);

  return {
    sortedData,
    sortField,
    sortDirection,
    handleSort,
    resetSort
  };
};