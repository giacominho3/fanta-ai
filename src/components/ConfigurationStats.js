import React from 'react';
import { theme } from '../theme/theme';
import { Text } from './ui/Typography';
import { getRoleColor } from './ConfigurationHeader';
import { roleMap } from '../constants/roles';

const ConfigurationStats = ({ 
  totalPlayers, 
  configuratedCount, 
  totalBudgetAssigned,
  selectedRole,
  filteredPlayersCount 
}) => {
  const getRoleDisplayName = (role) => {
    return roleMap[role] || role;
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      marginBottom: theme.spacing[6],
      padding: `0 ${theme.spacing[6]}`
    }}>
      {/* Section Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: theme.spacing[3] 
      }}>
        <div style={{ 
          width: theme.spacing[3], 
          height: theme.spacing[3], 
          background: getRoleColor(selectedRole), 
          borderRadius: '50%' 
        }}></div>
        <h2 style={{ 
          color: theme.colors.dark.text.primary, 
          fontSize: theme.typography.fontSize.lg, 
          fontWeight: theme.typography.fontWeight.semibold, 
          margin: 0 
        }}>
          {getRoleDisplayName(selectedRole)}
        </h2>
        <Text color="muted">({filteredPlayersCount})</Text>
      </div>
      
      {/* Stats */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: theme.spacing[4],
        fontSize: theme.typography.fontSize.sm 
      }}>
        <div style={{ 
          background: theme.colors.dark.surface.primary, 
          borderRadius: theme.borderRadius.lg, 
          padding: theme.spacing[3] 
        }}>
          <Text color="muted" style={{ display: 'inline' }}>Totale giocatori: </Text>
          <Text style={{ fontWeight: theme.typography.fontWeight.semibold, display: 'inline' }}>
            {totalPlayers}
          </Text>
        </div>
        
        <div style={{ 
          background: 'rgba(34, 197, 94, 0.2)', 
          borderRadius: theme.borderRadius.lg, 
          padding: theme.spacing[3] 
        }}>
          <Text style={{ color: theme.colors.primary[300], display: 'inline' }}>Configurati: </Text>
          <Text style={{ 
            color: theme.colors.primary[400], 
            fontWeight: theme.typography.fontWeight.semibold,
            display: 'inline' 
          }}>
            {configuratedCount}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationStats;